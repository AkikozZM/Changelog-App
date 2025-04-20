export interface ChangeEntry {
  date: string;
  title: string;
  whats_new: string;
  impact: string;
  breaking_change?: string;
}

export interface ChangelogResponse {
  entries: ChangeEntry[];
  commits_processed: number;
  repo_url: string;
  generated_at: string;
}
