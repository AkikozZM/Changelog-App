from openai import OpenAI
from dotenv import load_dotenv
import os
import json

# Load env file
load_dotenv()

# Get api key from my local .env
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def generate_changelog(commit_data):
    if not commit_data:
        return "No commit data"
    try:
        # Format commits with their dates
        formatted_commits = [
            f"Date: {dt.strftime('%Y-%m-%d')}\nMessage: {msg}"
            for msg, dt in commit_data
        ]
        # Format messages to OpenAI
        response = client.chat.completions.create(
            model= os.getenv("OPENAI_MODEL"),
            response_format={"type": "json_object"},
            messages=[{
                "role": "system",
                "content": """Analyze the GitHub commit data and generate a changelog in JSON format with the EXACT following structure: 
                {
                    "entries": [
                        {
                            "date": "YYYY-MM-DD",
                            "title": "summary of change",
                            "whats_new": "description of change",
                            "breaking_change": "null OR description of breaking changes",
                            "impact": "how this affects users"
                        }
                    ]
                }
                For each commit, determine if it contains breaking changes by looking for keywords like: 
                    - "breaking change"
                    - "important change"
                    - "significant change"
                Make breaking_change field None if you don't find the breaking changes.
                If you find the breaking changes, you need to summarize the breaking changes and write a description of why it is a breaking change.
                Make the output human-readable for non-technical users.""",
            }, {
                "role": "user",
                "content": "\n".join(formatted_commits),
            }]
        )
        
        # Parse the JSON response
        json_response = json.loads(response.choices[0].message.content)
        return json_response
    
    except Exception as err:
        raise ValueError(f"OpenAI error: {str(err)}")


