import React from "react";
import { PiCirclesThreePlusLight } from "react-icons/pi";

import MobileSidebar from "../SideBar/MobileBar/MobileSidebar";

interface HeaderProps {
  toggleMenu: () => void;
  handleClick: (label: string) => void;
  menuOpen: boolean;
  handleContactClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  toggleMenu,
  handleClick,
  menuOpen,
  handleContactClick
}) => {
  return (
    <div className="bg-[#b6b6b6] fixed top-0 left-0 w-full z-10 px-2">
      <span className="flex justify-between items-center p-2 lg:p-4 lg:px-12">
        <div className="flex justify-between items-center ">
          <div className="hidden lg:block w-full">
            <div className="w-full flex justify-between">
              <span className=" para_font  text-2xl font-extrabold tracking-wider">
                Akash Kumar Sinha
              </span>
            </div>
          </div>
          <div className="lg:hidden flex justify-between w-full md:px-4">
            <button
              onClick={toggleMenu}
              className="z-10 p-2 bg-[#F6671B] text-white rounded-full hover:bg-[#e55a1a] transition-colors"
            >
              <PiCirclesThreePlusLight size={28} />
            </button>
          </div>
        </div>
        <button onClick={handleContactClick} className="text-[#F6671B] text-xl font-semibold tracking-wide px-4  border-b-2 border-[#F6671B] transition-all duration-300 shadow-md shadow-[#F5F5F5] hover:shadow-lg">
          Contact
        </button>
      </span>

      <hr className="w-full h-1 bg-gradient-to-r from-[#f6671b] to-[#e55a1a] lineColor" />
      {menuOpen && <MobileSidebar handleClick={handleClick} />}
    </div>
  );
};

export default Header;
