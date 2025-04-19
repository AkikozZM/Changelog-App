from openai import OpenAI
from dotenv import load_dotenv
import os
import json
from datetime import datetime
from schemas import Response 

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

        response = client.chat.completions.create(
            model="gpt-4.1-nano",
            response_format={"type": "json_object"},
            messages=[{
                "role": "system",
                "content": """Analyze the GitHub commit data and generate a changelog in JSON format with the following structure: 
                {
                    "entries": [
                        {
                            "date": "YYYY-MM-DD",
                            "title": "summary of change",
                            "whats_new": "description of change",
                            "impact": "how this affects users"
                        }
                    ]
                }
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


