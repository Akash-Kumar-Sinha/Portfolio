import React from "react";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

interface MobileItemProps {
  label: string;
  icon: IconType;
  href: string;
  active: boolean;
}

const MobileItem: React.FC<MobileItemProps> = ({
  label,
  icon: Icon,
  href,
  active,
}) => {
  return (
    <li>
      <NavLink to={href} className="gap-2">
        <div className="flex group hover:text-black text-gray-500 py-5 p-4">
          <Icon size={27} />
          <span className="">{label}</span>
        </div>
        <hr className="relative overflow-hidden w-full h-0.5 border bg-gradient-to-r lineColor" />
      </NavLink>
    </li>
  );
};

export default MobileItem;
