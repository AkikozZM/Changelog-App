from fastapi import FastAPI, HTTPException, Request
from datetime import date
import os
import json
import base64
import requests
from dotenv import load_dotenv
from llm import generate_changelog
from utils import get_recent_commits
from schemas import Request, Response
from pathlib import Path

# Load environment variables
load_dotenv()

app = FastAPI(title="AI Changelog Generator")

# GitHub API configuration
REPO_PATH = os.getenv("REPO_PATH")
REPO_SINCE = os.getenv("REPO_SINCE", "7 days ago")
REPO_BRANCH = os.getenv("REPO_BRANCH", "main")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
REPO_OWNER = os.getenv("REPO_OWNER")
REPO_NAME = os.getenv("REPO_NAME")
CHANGELOG_PATH = "./back-end/outputs/changelog.json"

@app.post("/git_generate")
async def handle_webhook():
    try:
        # Validate environment variables
        if not all([REPO_PATH, GITHUB_TOKEN, REPO_OWNER, REPO_NAME]):
            raise HTTPException(
                status_code=400,
                detail="Missing required environment variables"
            )

        # Get commits from the target repository
        commits = get_recent_commits(REPO_PATH, REPO_SINCE, REPO_BRANCH)
        if not commits:
            return {"status": "success", "message": "No new commits found"}

        # Generate formatted changelog using LLM
        changelog = generate_changelog(commits)
        
        # Save to GitHub repository
        save_to_github(changelog)
        
        return {
            "status": "success",
            "commits_processed": len(commits),
            "changelog_entries": len(changelog.get("entries", []))
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def save_to_github(data):
    """Save the changelog data to the GitHub repository"""
    # Convert data to JSON string
    json_content = json.dumps(data, indent=2)
    
    # Encode content to base64
    encoded_content = base64.b64encode(json_content.encode("utf-8")).decode("utf-8")
    
    # GitHub API URL
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents/{CHANGELOG_PATH}"
    
    # First check if file exists to get its SHA
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    # Try to get existing file to update it
    response = requests.get(url, headers=headers)
    sha = None
    if response.status_code == 200:
        sha = response.json().get("sha")
    
    # Create or update the file
    payload = {
        "message": f"Update changelog {date.today()}",
        "content": encoded_content,
        "branch": "main"
    }
    
    if sha:
        payload["sha"] = sha
    
    response = requests.put(url, headers=headers, json=payload)
    
    if response.status_code not in [200, 201]:
        raise Exception(f"Failed to update GitHub: {response.text}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)



@app.post("/generate", response_model=Response)
async def generate_changelog_api():
    try:
        # Validate environment variables
        if not all([REPO_PATH, GITHUB_TOKEN, REPO_OWNER, REPO_NAME]):
            raise HTTPException(
                status_code=400,
                detail="Missing required environment variables"
            )
        
        commits = get_recent_commits(
            REPO_PATH,
            REPO_SINCE,
            REPO_BRANCH,
        )
        if not commits:
            return Response(
                entries=[],
                commits_processed=0,
                repo_url=REPO_PATH,
                generated_at=date.today()
            )
        
        # call openai api
        changelog = generate_changelog(commits)
        # Validate and complete entries
        validated_entries = []
        for entry in changelog.get("entries", []):
            # Ensure required fields exist
            if not all(field in entry for field in ["date", "title", "whats_new", "impact"]):
                continue  # Skip invalid entries
                
            # Convert date if needed
            entry_date = entry["date"]
            if isinstance(entry_date, str):
                entry_date = date.fromisoformat(entry_date)
                
            validated_entries.append({
                "date": entry_date,
                "title": entry["title"],
                "whats_new": entry["whats_new"],
                "breaking_change": entry.get("breaking_change"),
                "impact": entry["impact"]
            })

        response = Response(
            entries=validated_entries,
            commits_processed=len(commits),
            repo_url=REPO_PATH,
            generated_at=date.today()
        )
        
        # Save JSON file
        save_to_github(response.dict())
        return response
    
    except Exception as err:
        raise HTTPException(status_code=400, detail=str(err))
    

def save_response_to_json(response: Response) -> str:
    # Use absolute path for reliability
    output_dir = Path(__file__).parent / "outputs"  # Saves in /back-end/outputs
    output_dir.mkdir(exist_ok=True)
    
    filepath = output_dir / "changelog.json"
    
    try:
        with open(filepath, "w") as f:
            json.dump(response.dict(), f, indent=2, default=str)
        print(f"Successfully saved to {filepath}")  # Debug logging
        return str(filepath)
    except Exception as e:
        print(f"Failed to save file: {str(e)}")
        raise