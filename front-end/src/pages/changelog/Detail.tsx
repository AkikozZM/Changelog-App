import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiCheckSquare } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";
import { LoadingSkeleton } from "../../components/ui/loading-skeleton";

interface ChangeEntry {
  date: string;
  title: string;
  whats_new: string;
  breaking_change: string | null;
  impact: string;
}

export default function ChangelogDetail() {
  const { date, index } = useParams<{ date: string; index: string }>();
  const [entry, setEntry] = useState<ChangeEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("whats-new");
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = sectionsRef.current[id];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await import(
          "../../../../back-end/outputs/changelog.json"
        );
        const entries = response.default.entries;
        const entryDate = new Date(date!).toISOString().split("T")[0];
        const foundEntry = entries.find(
          (e: ChangeEntry) =>
            e.date === entryDate &&
            entries.filter((e) => e.date === entryDate).indexOf(e) ===
              Number(index)
        );
        setEntry(foundEntry || null);
      } catch (err) {
        console.error("Failed to load changelog entry:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date, index]);

  useEffect(() => {
    sectionsRef.current = {
      "whats-new": document.getElementById("whats-new"),
      "breaking-change": document.getElementById("breaking-change"),
      impact: document.getElementById("impact"),
      upgrade: document.getElementById("upgrade"),
      "related-changes": document.getElementById("related-changes"),
    };

    const handleScroll = () => {
      if (!contentRef.current) return;

      const scrollPosition = contentRef.current.scrollTop + 100;
      let newActiveSection = "whats-new";

      Object.entries(sectionsRef.current).forEach(([id, element]) => {
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            newActiveSection = id;
          }
        }
      });

      setActiveSection(newActiveSection);
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [entry]);

  if (loading)
    return (
      <div className="p-8">
        <LoadingSkeleton />
      </div>
    );
  if (!entry) return <div className="p-8 text-red-500">Entry not found</div>;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-8 pt-8 pb-4">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-6 space-x-2">
          <Link to="/home" className="hover:text-gray-600">
            Home
          </Link>
          <span>/</span>
          <Link to="/changelog/overview" className="hover:text-gray-600">
            Developer tools
          </Link>
          <span>/</span>
          <Link to="/changelog/overview" className="hover:text-gray-600">
            Changelog
          </Link>
          <span>/</span>
          <span className="text-gray-700">
            {new Date(entry.date)
              .toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
              .replace(/\//g, "-")}
          </span>
        </div>

        {/* Title and Content Area */}
        <div className="relative">
          {/* Main Content with Nav */}
          <div className="flex">
            {/* Content Area */}
            <div className="flex-1 overflow-y-auto pr-4" ref={contentRef}>
              <div className="max-w-3xl mx-auto">
                <div className="mb-15">
                  <h1 className="text-3xl font-bold items-center">
                    {entry.title}
                    {entry.breaking_change && (
                      <span className="inline-flex items-center bg-amber-200 rounded-md px-1 py-0 mx-1 border border-gray-200 text-red-700">
                        <span className="text-sm">Breaking changes</span>
                      </span>
                    )}
                  </h1>
                </div>

                <div id="whats-new" className="mb-8 scroll-mt-16">
                  <h2 className="text-xl font-semibold mb-4">What's new</h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {entry.whats_new}
                  </p>
                </div>

                {entry.breaking_change && (
                  <div id="breaking-change" className="mb-8 scroll-mt-16">
                    <h2 className="text-xl font-semibold mb-4">
                      Why is this a breaking change?
                    </h2>
                    <p className="text-gray-700 whitespace-pre-line">
                      {entry.breaking_change}
                    </p>
                  </div>
                )}

                <div id="impact" className="mb-8 scroll-mt-16">
                  <h2 className="text-xl font-semibold mb-4">Impact</h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {entry.impact}
                  </p>
                </div>

                <div id="upgrade" className="mb-8 scroll-mt-16">
                  <h2 className="text-xl font-semibold mb-4">Upgrade</h2>
                  <p className="text-gray-700">
                    Placeholder for instructions for upgrading
                  </p>
                </div>

                <div id="related-changes" className="mb-8 scroll-mt-16">
                  <h2 className="text-xl font-semibold mb-4">
                    Related changes
                  </h2>
                  <p className="text-gray-700">
                    Placeholder for related changes
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Navigation Bar*/}
            <div className="w-64 pl-4 sticky top-4 h-[calc(100vh-180px)] overflow-y-auto">
              <div className="fixed bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  ON THIS PAGE
                </h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => scrollToSection("whats-new")}
                      className={`block w-full text-left px-2 py-1 rounded-md cursor-pointer ${
                        activeSection === "whats-new"
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      What's new
                    </button>
                  </li>
                  {entry.breaking_change && (
                    <li>
                      <button
                        onClick={() => scrollToSection("breaking-change")}
                        className={`block w-full text-left px-2 py-1 rounded-md cursor-pointer ${
                          activeSection === "breaking-change"
                            ? "bg-amber-50 text-amber-600 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        Breaking changes
                      </button>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => scrollToSection("impact")}
                      className={`block w-full text-left px-2 py-1 rounded-md cursor-pointer ${
                        activeSection === "impact"
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Impact
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("upgrade")}
                      className={`block w-full text-left px-2 py-1 rounded-md cursor-pointer ${
                        activeSection === "upgrade"
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Upgrade
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("related-changes")}
                      className={`block w-full text-left px-2 py-1 rounded-md cursor-pointer ${
                        activeSection === "related-changes"
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Related changes
                    </button>
                  </li>
                </ul>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    RELATED PRODUCTS
                  </h3>
                  <div className="flex items-center">
                    <FiCheckSquare className="text-green-500 mr-2" />
                    <span className="cursor-pointer">Billing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
