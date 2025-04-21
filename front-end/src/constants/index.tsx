import { FiHome, FiMessageSquare, FiGitCommit } from "react-icons/fi";

export const changelogItems = ["Overview", "Basil", "Acacia"];

export const mainItems = [
  {
    name: "Home",
    icon: <FiHome size={18} />,
    path: "/home",
  },
  {
    name: "Chat",
    icon: <FiMessageSquare size={18} />,
    path: "/chat",
  },
  {
    name: "Changelog",
    icon: <FiGitCommit size={18} />,
    path: "/changelog",
    subItems: changelogItems,
  },
];
