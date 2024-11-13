import React from "react";
import { IconType } from "react-icons";

interface DesktopItemProps {
  label: string;
  icon: IconType;
  handleClick: () => void;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  icon: Icon,
  handleClick,
}) => {
  return (
    <li onClick={handleClick}>
      <div>
        <div className="flex group border-2 border-transparent hoverbar hover:border-white rounded-r-full transition duration-2000 p-4 gap-2">
          <Icon size={27} />
          <span className="text-white opacity-0 -translate-x-20 z-0 group-hover:translate-x-0 transition group-hover:opacity-100 duration-1000">
            {label}
          </span>
        </div>
      </div>
    </li>
  );
};

export default DesktopItem;
