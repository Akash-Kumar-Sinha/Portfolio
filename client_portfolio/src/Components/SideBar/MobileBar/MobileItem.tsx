import React from "react";
import { IconType } from "react-icons";

interface MobileItemProps {
  label: string;
  icon: IconType;
  handleClick: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  label,
  icon: Icon,
  handleClick,
}) => {
  return (
    <li onClick={handleClick} className="w-full">
      <div className="w-full">
        <div className="flex items-center gap-3 p-4 py-5 group transition-all duration-200 ease-in-out hover:bg-[#F6671B]">
          <Icon size={24} className="text-[#232323] group-hover:text-white" />
          <span className="text-lg font-medium text-[#232323] group-hover:text-white">
            {label}
          </span>
        </div>
        <hr className="relative w-full h-0.5 border bg-gradient-to-r lineColor transition-all duration-300" />
      </div>
    </li>
  );
};

export default MobileItem;
