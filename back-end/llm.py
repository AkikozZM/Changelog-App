from openai import OpenAI
from typing import List
from dotenv import load_dotenv
import os

load_dotenv()

# Get api key from my local .env
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def generate_changelog(commit_messages: List[str]) -> str:
    if not commit_messages:
        return "No changes detected"
    try:
        response = client.chat.completions.create(
            model="gpt-4.1-nano",
            messages=[{
                "role": "user",
                "content": f"Summarize these Git commits into changelog markdown:\n{commit_messages}"
            }]
        )
        return response.choices[0].message.content
    except Exception as err:
        raise ValueError(f"OpenAI error: {str(err)}")


# http POST http://localhost:8000/generate `
#     repo_path="https://github.com/AkikozZM/Changelog-App.git" `
#     since="3 days ago" `
#     branch="main"