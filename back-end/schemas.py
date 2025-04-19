from pydantic import BaseModel

class Request(BaseModel):
    repo_path: str
    since: str = "7 days ago"
    branch: str = "main"

class Response(BaseModel):
    markdown: str
    commits_processed: int