import axios from "axios";
import { ChangelogResponse } from "./types";

// Local Test First
const API_BASE_URL = "http://localhost:8000";

export const generateChangelog = async (
  repoPath: string,
  since = "7 days ago",
  branch = "main"
): Promise<ChangelogResponse> => {
  const response = await axios.post<ChangelogResponse>(
    `${API_BASE_URL}/generate`,
    {
      repo_path: repoPath,
      since,
      branch,
    }
  );
  return response.data;
};
