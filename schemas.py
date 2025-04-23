from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date

class ChangeEntry(BaseModel):
    date: date
    title: str
    whats_new: str
    breaking_change: Optional[str] = Field(default=None, nullable=True)
    impact: str

class Request(BaseModel):
    repo_path: Optional[str] = None
    since: str = "7 days ago"
    branch: str = "main"


class Response(BaseModel):
    entries: List[ChangeEntry]
    commits_processed: int
    repo_url: str
    generated_at: date