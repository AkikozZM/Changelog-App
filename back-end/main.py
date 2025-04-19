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
        if not commits:
            return {
                "markdown": "No changes found in the specified timeframe",
                "commits_processed": 0
            }
        # call openai api
        changelog = generate_changelog(commits)
        return {
            "markdown": changelog,
            "commits_processed": len(commits)
        }
    except Exception as err:
        raise HTTPException(status_code=400, detail=str(err))
    

# Local Test Api command:
# uvicorn main:app --reload


# http POST http://localhost:8000/generate repo_path="https://github.com/AkikozZM/Changelog-App" since="3 days ago" branch="main"