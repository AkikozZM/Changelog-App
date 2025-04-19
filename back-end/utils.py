from git import Repo, GitCommandError
from typing import List

def get_recent_commits(repo_path: str, since: str, branch: str) -> List[str]:
    try:
        repo = Repo(repo_path)
        commits = list(repo.iter_commits(branch, since = since))
        return [commit.message for commit in commits]
    except GitCommandError as err:
        raise ValueError(f"Git error: {err}")
