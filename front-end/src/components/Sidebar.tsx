import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiChevronDown } from "react-icons/fi";
import { mainItems } from "../constants";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isChangelogOpen, setIsChangelogOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Overview");

  return (
    <div
      className={`h-screen bg-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-15" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && <h2 className="font-semibold">Greptile</h2>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-gray-200 cursor-pointer"
        >
          {isCollapsed ? (
            <FiChevronRight size={18} />
          ) : (
            <FiChevronLeft size={18} />
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
                    onClick={() =>
                      !isCollapsed && setIsChangelogOpen(!isChangelogOpen)
                    }
                    className={`flex items-center w-full p-2 rounded-md hover:bg-gray-200 cursor-pointer ${
                      isCollapsed ? "justify-center" : ""
                    } ${activeItem.startsWith(item.name) ? "bg-gray-100" : ""}`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-sm text-left ml-2">
                          {item.name}
                        </span>
                        <FiChevronDown
                          size={16}
                          className={`transition-transform ${
                            isChangelogOpen ? "" : "rotate-180"
                          }`}
                        />
                      </>
                    )}
                  </button>

                  {!isCollapsed && isChangelogOpen && (
                    <div className="relative pl-6 mt-1">
                      <div
                        className="absolute left-4 top-0 bottom-0 w-px bg-gray-300"
                        style={{ height: `${item.subItems.length * 40}px` }}
                      ></div>
                      <ul className="space-y-1">
                        {item.subItems.map((subItem) => (
                          <li key={subItem} className="relative">
                            <button
                              onClick={() =>
                                setActiveItem(`${item.name}-${subItem}`)
                              }
                              className={`block w-full text-left pl-4 py-2 rounded-md hover:bg-gray-200 text-sm cursor-pointer ${
                                activeItem === `${item.name}-${subItem}`
                                  ? "font-bold text-gray-900 bg-gray-300"
                                  : "text-gray-600"
                              }`}
                            >
                              {subItem}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
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
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
