from openai import OpenAI
from typing import Any, Dict, List, Tuple
from dotenv import load_dotenv
import os
import json
from datetime import datetime

load_dotenv()

# Get api key from my local .env
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def generate_changelog(commit_data: List[Tuple[str, datetime]]) -> List[Dict[str, Any]]:
    if not commit_data:
        return []
    try:
        # Format commits with dates for the LLM
        formatted_commits = [
            f"[{date.strftime('%Y-%m-%d')}] {message}"
            for message, date in commit_data
        ]
        response = client.chat.completions.create(
            model="gpt-4.1-nano",
            response_format={"type": "json_object"},
            messages=[{
                "role": "system",
                "content": """You MUST return JSON with these EXACT fields for each change:
{
  "changes": [
    {
      "date": "YYYY-MM-DD",
      "title": "string",
      "what's new": "string",  // REQUIRED field
      "breaking change": "string | null",
      "impact": "string",
      "related changes": ["string"] | null
    }
  ]
}"""
            }, {
                "role": "user",
                "content": f"Convert these Git commits into structured changelog entries:\n{json.dumps(formatted_commits)}"
            }]
        )
        
        result = json.loads(response.choices[0].message.content)
        changes = result.get("changes", [])
        # Validate required fields exist
        validated_changes = []
        for change in changes:
            if not change.get("what's new"):
                raise ValueError("Missing required 'what's new' field in LLM response")
            validated_changes.append({
                "date": change["date"],
                "title": change.get("title", "Update"),
                "what's new": change["what's new"],
                "breaking change": change.get("breaking change"),
                "impact": change.get("impact", "Various components"),
                "related changes": change.get("related changes", [])
            })
            
        return validated_changes
    
    except Exception as err:
        raise ValueError(f"OpenAI error: {str(err)}")


