import { FiHome, FiGitCommit } from "react-icons/fi";

export const changelogItems = [
  {
    name: "Changelog_Overview",
    path: "/changelog/overview",
  },
  {
    name: "Changelog_Basil",
    path: "/changelog/basil",
  },
  {
    name: "Changelog_Acacia",
    path: "/changelog/acacia",
  },
];

export const mainItems = [
  {
    name: "Home",
    icon: <FiHome size={18} />,
    path: "/home",
  },
  // {
  //   name: "Chat",
  //   icon: <FiMessageSquare size={18} />,
  //   path: "/chat",
  // },
  {
    name: "Changelog",
    icon: <FiGitCommit size={18} />,
    path: "/changelog",
    subItems: changelogItems,
  },
];
