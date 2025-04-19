from fastapi import FastAPI, HTTPException
from utils import get_recent_commits  
from llm import generate_changelog  
from schemas import Request, Response 

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
        # call openai api
        changelog = generate_changelog(commits)
    except Exception as err:
        raise HTTPException(status_code=400, detail=str(err))