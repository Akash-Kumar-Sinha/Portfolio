import React from "react";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

interface DesktopItemProps {
  label: string;
  icon: IconType;
  href: string;
  active: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  icon: Icon,
  href,
  active,
}) => {
  return (
    <li>
      <NavLink to={href} className="gap-2">
        <div className="flex group border-2 border-transparent hoverbar rounded-r-full transition duration-2000 py-5 p-4 gap-2">
          <Icon
            size={27}
          />
          <span className="text-white opacity-0 -translate-x-20 z-0 group-hover:translate-x-0 transition group-hover:opacity-100 duration-1000">
            {label}
          </span>
        </div>
      </NavLink>
    </li>
  );
};

export default DesktopItem;
