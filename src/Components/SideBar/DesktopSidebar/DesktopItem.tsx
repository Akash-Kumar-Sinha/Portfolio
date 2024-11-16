import React from "react";
import { IconType } from "react-icons";

import { Path } from "../../../utils/types";

const mapLabelToPath = (label: string): Path => {
  switch (label.toUpperCase()) {
    case "HOME":
      return Path.HOME;
    case "PROJECTS":
      return Path.PROJECTS;
    case "SKILLS":
      return Path.SKILLS;
    case "LINKS":
      return Path.LINKS;
    default:
      return Path.HOME;
  }
};

interface DesktopItemProps {
  label: string;
  icon: IconType;
  pathName: Path;
  handleClick: () => void;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  icon: Icon,
  pathName,
  handleClick,
}) => {
  const itemPath = mapLabelToPath(label);

  return (
    <li onClick={handleClick}>
      <div>
        <div
          className={`flex group border-2  rounded-xl p-4 gap-3 items-center transition duration-300 ${
            pathName === itemPath
              ? "border-[#F6671B]"
              : "border-transparent hover:border-[#F6671B]"
          }`}
        >
          <Icon
            size={28}
            className={`group-hover:text-[#F6671B] ${
              pathName === itemPath ? "text-[#F6671B]" : "text-[#F5F5F5]"
            }`}
          />
          <span
            className={`text-[#F6671B] opacity-0 -translate-x-20 z-0 group-hover:translate-x-0 transition group-hover:opacity-100 duration-300 ${
              pathName === itemPath && "translate-x-0 opacity-100"
            }`}
          >
            {label}
          </span>
        </div>
      </div>
    </li>
  );
};

export default DesktopItem;
