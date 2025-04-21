import { useState, useEffect } from "react";
import { FiSearch, FiAlertTriangle, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";

interface ChangeEntry {
  date: string;
  title: string;
  whats_new: string;
  breaking_change: string | null;
  impact: string;
}

interface ChangelogData {
  entries: ChangeEntry[];
  commits_processed: number;
  repo_url: string;
  generated_at: string;
}

interface GroupedEntry {
  date: string;
  entries: ChangeEntry[];
}

export default function ChangelogOverview() {
  const [data, setData] = useState<ChangelogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "breaking">("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await import(
          "../../../../back-end/outputs/changelog.json"
        );
        setData(response.default);
      } catch (err) {
        console.error("Failed to load changelog data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const groupByDate = (entries: ChangeEntry[]): GroupedEntry[] => {
    const grouped: Record<string, ChangeEntry[]> = {};

    entries.forEach((entry) => {
      if (!grouped[entry.date]) {
        grouped[entry.date] = [];
      }
      grouped[entry.date].push(entry);
    });

    return Object.keys(grouped)
      .map((date) => ({
        date,
        entries: grouped[date],
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const filteredEntries =
    data?.entries.filter((entry) => {
      const matchesSearch =
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.whats_new.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBreaking =
        filter === "all" || entry.breaking_change !== null;
      return matchesSearch && matchesBreaking;
    }) || [];

  const groupedEntries = groupByDate(filteredEntries);

  if (loading) return <div className="p-8">Loading changelog...</div>;
  if (!data)
    return (
      <div className="p-8 text-red-500">Failed to load changelog data</div>
    );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-8 pt-8 pb-4">
        <div className="text-sm text-gray-500 mb-2">
          <Link to={"/home"} className="hover:text-gray-600">
            Home
          </Link>
          <span className="mx-1">/</span>
          <Link to={"/changelog/overview"} className="hover:text-gray-600">
            Developer tools
          </Link>
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Changelog</h1>
            <p className="text-gray-600">
              Keep track of changes and upgrades to the Graphite API.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-8 py-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value as "all" | "breaking")}
          >
            <option value="all">All changes</option>
            <option value="breaking">Breaking changes only</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
            <option>Product: All</option>
            <option>Basil</option>
            <option>Acacia</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
            <option>Category: All</option>
            <option>Billing</option>
            <option>API</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="px-8 py-4">
        <div className="flex items-center text-sm text-gray-600">
          <FiCalendar className="text-gray-500 mr-2" />
          Latest update on {data.generated_at} from {data.commits_processed}{" "}
          commits
        </div>
      </div>

      {/* Grouped Changelog Entries */}
      <div className="flex-1 overflow-auto px-8 py-6">
        {groupedEntries.length > 0 ? (
          <div className="space-y-8">
            {groupedEntries.map((group, index) => (
              <div key={index}>
                <div className="flex items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {new Date(group.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </h2>
                  {group.entries.some((e) => e.breaking_change) && (
                    <span className="ml-3 px-2 py-1 bg-red-50 text-red-700 text-xs rounded-full flex items-center">
                      <FiAlertTriangle className="" /> Breaking changes
                    </span>
                  )}
                </div>

                <div className="grid">
                  {group.entries.map((entry, entryIndex) => (
                    <Link
                      to={`/changelog/entry/${entry.date}/${entryIndex}`}
                      key={entryIndex}
                      className="block group border border-gray-200 p-4 hover:border-blue-400 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium group-hover:text-blue-600">
                          {entry.title}
                        </h3>
                        {entry.breaking_change && (
                          <FiAlertTriangle className="text-red-600 ml-2 mt-1 text-sm" />
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No matching changelog entries found
          </div>
        )}
      </div>
    </div>
  );
}
