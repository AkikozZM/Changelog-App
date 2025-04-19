from typing import List
from git import Repo
import os
import tempfile

def get_recent_commits(repo_path: str, since: str, branch: str) -> List[str]:
    if repo_path.startswith(('http://', 'https://', 'git@')):
        temp_dir = tempfile.mkdtemp()
        repo = Repo.clone_from(repo_path, temp_dir)
        repo_path = temp_dir
    
    repo = Repo(repo_path)
    commits = list(repo.iter_commits(branch, since=since))
    return [commit.message for commit in commits]
