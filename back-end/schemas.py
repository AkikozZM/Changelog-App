from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date

class ChangeEntry(BaseModel):
    date: date
    title: str = Field(..., max_length=100)
    whats_new: str = Field(..., alias="what's new")
    breaking_change: Optional[str] = Field(
        None,
        alias="breaking change",
        description="Explanation if this is a breaking change"
    )
    impact: str
    related_changes: Optional[List[str]] = Field(
        None,
        alias="related changes",
        description="List of associated modifications"
    )

class Request(BaseModel):
    repo_path: str
    since: str = "7 days ago"
    branch: str = "main"


class Response(BaseModel):
    entries: List[ChangeEntry]
    commits_processed: int
    repo_url: str
    generated_at: date