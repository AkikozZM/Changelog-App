from fastapi import FastAPI, HTTPException
from utils import get_recent_commits  
from llm import generate_changelog  
from schemas import ChangeEntry, Request, Response 
from datetime import date

app = FastAPI(title="AI Changelog Generator")  

@app.post("/generate", response_model=Response)
async def generate_changelog_api(request: Request):
    try:
        # setup commits
        commits = get_recent_commits(
            request.repo_path,
            request.since,
            request.branch
        )
        if not commits:
            return Response(
                entries=[],
                commits_processed=0,
                repo_url=request.repo_path,
                generated_at=date.today()
            )
        
        # call openai api
        changelog = generate_changelog(commits)
        # Convert dates from strings to date objects
        for entry in changelog.get("entries", []):
            if "date" in entry and isinstance(entry["date"], str):
                entry["date"] = date.fromisoformat(entry["date"])

        return Response(
            entries=changelog.get("entries", []),
            commits_processed=len(commits),
            repo_url=request.repo_path,
            generated_at=date.today()
        )
    
    except Exception as err:
        raise HTTPException(status_code=400, detail=str(err))
    

