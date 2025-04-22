import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Auto-collapse when window width is below 1024px
      const shouldCollapse = window.innerWidth < 1024;
      setIsCollapsed(shouldCollapse);
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar with auto-collapse */}
      <div
        className={`fixed left-0 top-0 h-full transition-all duration-300 ${
          isCollapsed ? "" : "w-64"
        }`}
      >
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Content area with dynamic margin */}
      <div
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isCollapsed ? "px-20" : "ml-64" // Match sidebar widths
        }`}
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-8">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
