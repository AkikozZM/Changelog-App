from fastapi import FastAPI, HTTPException
from utils import get_recent_commits  
from llm import generate_changelog  
from schemas import Response 
from datetime import date
from fastapi.middleware.cors import CORSMiddleware
import json
import os
from dotenv import load_dotenv
from pathlib import Path

# Load env file
load_dotenv()

app = FastAPI(title="AI Changelog Generator")  

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate", response_model=Response)
async def generate_changelog_api():
    try:
        # setup commits
        repo_path = os.getenv("REPO_PATH")
        repo_since = os.getenv("REPO_SINCE", "7 days ago")
        repo_branch = os.getenv("REPO_BRANCH", "main")

        if not repo_path:
            raise HTTPException(
                status_code=400,
                detail="Repository path not configured. Please set REPO_PATH in .env"
            )
        
        commits = get_recent_commits(
            repo_path,
            repo_since,
            repo_branch,
        )
        if not commits:
            return Response(
                entries=[],
                commits_processed=0,
                repo_url=repo_path,
                generated_at=date.today()
            )
        
        # call openai api
        changelog = generate_changelog(commits)
        # Convert dates from strings to date objects
        for entry in changelog.get("entries", []):
            if "date" in entry and isinstance(entry["date"], str):
                entry["date"] = date.fromisoformat(entry["date"])

        response = Response(
            entries=changelog.get("entries", []),
            commits_processed=len(commits),
            repo_url=repo_path,
            generated_at=date.today()
        )
        # Save JSON file
        save_response_to_json(response)
        return response
    
    except Exception as err:
        raise HTTPException(status_code=400, detail=str(err))
    

def save_response_to_json(response: Response) -> str:
    output_dir = Path("./outputs")
    output_dir.mkdir(exist_ok=True)
    filename = f"changelog.json"
    filepath = output_dir / filename
    
    with open(filepath, "w") as f:
        json.dump(response.dict(), f, indent=2, default=str)

    # return the saved file path
    return str(filepath)