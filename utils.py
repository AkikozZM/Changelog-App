from typing import List, Tuple
from git import Repo
import tempfile
from datetime import datetime

def get_recent_commits(repo_path: str, since: str, branch: str) -> List[Tuple[str, datetime]]:
    if repo_path.startswith(('http://', 'https://', 'git@')):
        temp_dir = tempfile.mkdtemp()
        repo = Repo.clone_from(repo_path, temp_dir)
        repo_path = temp_dir
    
    repo = Repo(repo_path)
    commits = list(repo.iter_commits(branch, since=since))
    return [
        (commit.message, datetime.fromtimestamp(commit.committed_date))
        for commit in commits
    ]
