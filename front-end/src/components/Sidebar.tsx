import { useState } from "react";
import { FiChevronRight, FiChevronsRight, FiSidebar } from "react-icons/fi";
import { mainItems } from "../constants";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState("Overview");
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  const location = useLocation();

  return (
    <div
      className={`h-full bg-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-[4.5rem]" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <Link to={"/home"}>
            <h2 className="font-semibold text-green-700">Greptile</h2>
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-gray-200 cursor-pointer"
        >
          {isCollapsed ? (
            <FiChevronsRight size={18} />
          ) : (
            <FiSidebar size={18} />
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-2">
        <ul className="space-y-1">
          {mainItems.map((item) => (
            <li key={item.name}>
              {item.subItems ? (
                <>
                  <button
                    onClick={() => !isCollapsed && toggleSubmenu(item.name)}
                    className={`flex items-center w-full p-2 rounded-md hover:bg-gray-200 cursor-pointer ${
                      isCollapsed ? "justify-center" : ""
                    } ${
                      location.pathname.startsWith(item.path)
                        ? "bg-gray-100"
                        : ""
                    }`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-sm text-left ml-2">
                          {item.name}
                        </span>
                        <FiChevronRight
                          size={16}
                          className={`transition-transform ${
                            openSubmenu === item.name ? "rotate-90" : ""
                          }`}
                        />
                      </>
                    )}
                  </button>

                  {!isCollapsed && openSubmenu === item.name && (
                    <div className="relative pl-6 mt-1">
                      <div
                        className="absolute left-4 top-0 bottom-0 w-px bg-gray-300"
                        style={{ height: `${item.subItems.length * 40}px` }}
                      ></div>
                      <ul className="space-y-1">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.name} className="relative">
                            <Link
                              to={subItem.path}
                              className={`block w-full text-left pl-4 py-2 rounded-md hover:bg-gray-200 text-sm cursor-pointer ${
                                location.pathname === subItem.path
                                  ? "font-bold text-gray-900 bg-gray-300"
                                  : "text-gray-600"
                              }`}
                            >
                              {subItem.name.replace("Changelog_", "")}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link to={item.path}>
                  <button
                    onClick={() => setActiveItem(item.name)}
                    className={`flex items-center w-full p-2 rounded-md hover:bg-gray-200 cursor-pointer ${
                      isCollapsed ? "justify-center" : ""
                    } ${activeItem === item.name ? "bg-gray-300" : ""}`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!isCollapsed && (
                      <span className="text-sm ml-2">{item.name}</span>
                    )}
                  </button>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
