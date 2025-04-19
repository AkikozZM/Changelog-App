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
        changes = generate_changelog(commits)
        
        entries = []
        for change in changes:
            try:
                entries.append(ChangeEntry(
                    date=change["date"],
                    title=change["title"],
                    whats_new=change["what's new"],
                    breaking_change=change.get("breaking change"),
                    impact=change["impact"],
                    related_changes=change.get("related changes", [])
                ))
            except Exception as err:
                print(f"Skipping invalid change entry: {err}")
                continue
                
        if not entries:
            raise HTTPException(
                status_code=400,
                detail="No valid changelog entries could be generated"
            )
        
        return Response(
            entries=entries,
            commits_processed=len(commits),
            repo_url=request.repo_path,
            generated_at=date.today()
        )
    
    except Exception as err:
        raise HTTPException(status_code=400, detail=str(err))
    

