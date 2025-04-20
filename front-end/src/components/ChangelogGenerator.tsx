import React, { useState } from "react";
import { generateChangelog } from "../api";
import { ChangelogResponse } from "../types";

const ChangelogGenerator: React.FC = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [since, setSince] = useState("7 days ago");
  const [branch, setBranch] = useState("main");
  const [changelog, setChangelog] = useState<ChangelogResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await generateChangelog(repoUrl, since, branch);
      setChangelog(result);
    } catch (err) {
      setError(
        "Failed to generate changelog. Please check the URL and try again: " +
          err
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        AI Changelog Generator
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Repository URL</label>
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/user/repo.git"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">Time Range</label>
            <input
              type="text"
              value={since}
              onChange={(e) => setSince(e.target.value)}
              placeholder="7 days ago"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Branch</label>
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="main"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 bg-primary text-white font-medium rounded-md hover:bg-blue-600 transition-colors ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating...
            </span>
          ) : (
            "Generate Changelog"
          )}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {changelog && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Changelog for {changelog.repo_url}
            </h2>
            <p className="text-gray-600 mt-1">
              Generated on {formatDate(changelog.generated_at)} •{" "}
              {changelog.commits_processed} commits processed
            </p>
          </div>

          <div className="space-y-4">
            {changelog.entries.map((entry, index) => (
              <div key={index} className="border-l-4 border-primary pl-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {formatDate(entry.date)}
                  </span>
                  {entry.breaking_change && (
                    <span className="bg-danger text-white text-xs px-2 py-1 rounded-full">
                      Breaking Change
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-medium text-gray-800 mt-1">
                  {entry.title}
                </h3>
                <p className="text-gray-700 mt-1">
                  <span className="font-semibold">What's new:</span>{" "}
                  {entry.whats_new}
                </p>
                <p className="text-gray-700 mt-1">
                  <span className="font-semibold">Impact:</span> {entry.impact}
                </p>
                {entry.breaking_change && (
                  <div className="mt-2 bg-red-50 p-3 rounded-md">
                    <p className="font-semibold text-red-800">
                      Breaking Change Notice
                    </p>
                    <p className="text-red-700 mt-1">{entry.breaking_change}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangelogGenerator;
