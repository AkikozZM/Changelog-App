import openai
from typing import List

def generate_changelog(commit_messages: List[str]) -> str:
    prompt = f"""  
    Summarize these Git commits into a user-friendly changelog (Markdown format):  
    - Group changes under `Added`, `Fixed`, `Changed`, `Deprecated`.  
    - Focus on end-user impact (avoid internal/refactor commits).  

    Commits:  
    {commit_messages}  
    """  

    response = openai.ChatCompletion.create(  
        model="gpt-4",  
        messages=[{"role": "user", "content": prompt}]  
    )  
    return response.choices[0].message.content