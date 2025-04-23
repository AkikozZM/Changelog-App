from fastapi import FastAPI, HTTPException, Request
from datetime import date
from pathlib import Path
import os
import json
import base64
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="AI Changelog Generator")

# GitHub API configuration
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
REPO_OWNER = os.getenv("REPO_OWNER")
REPO_NAME = os.getenv("REPO_NAME")
CHANGELOG_PATH = "./back-end/outputs/changelog.json"

@app.post("/webhook")
async def handle_webhook(request: Request):
    try:
        # Get the GitHub payload
        payload = await request.json()
        
        # Verify this is a push event
        if 'pusher' not in payload:
            return {"status": "ignored", "reason": "Not a push event"}
            
        # Get commit messages
        commits = payload.get("commits", [])
        if not commits:
            return {"status": "ignored", "reason": "No commits in payload"}
        
        # Generate changelog data
        changelog_data = {
            "generated_at": str(date.today()),
            "commits_processed": len(commits),
            "entries": [
                {
                    "date": commit["timestamp"][:10],
                    "message": commit["message"],
                    "author": commit["author"]["name"],
                    "sha": commit["id"]
                }
                for commit in commits
            ]
        }
        
        # Save to GitHub repository
        save_to_github(changelog_data)
        
        return {"status": "success", "commits_processed": len(commits)}
    
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
    uvicorn.run(app, host="0.0.0.0", port=8000)