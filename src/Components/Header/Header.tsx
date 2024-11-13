import React from "react";
import { PiCirclesThreePlusLight } from "react-icons/pi";
import { AiFillLike } from "react-icons/ai";

import MobileSidebar from "../SideBar/MobileBar/MobileSidebar";
import axios from "axios";

interface HeaderProps {
  toggleMenu: () => void;
  handleClick: (label: string) => void;
  menuOpen: boolean;
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

if (!SERVER_URL) {
  throw new Error("Server URL not found");
}

const onClickLike = async () => {
  await axios.put(`${SERVER_URL}/likes`);
};

const Header: React.FC<HeaderProps> = ({
  toggleMenu,
  handleClick,
  menuOpen,
}) => {
  return (
    <div className="bg-zinc-950 fixed top-0 left-0 w-full z-10 lg:px-8 px-4">
      <div className="flex justify-between items-center p-4">
        <div className="hidden lg:block w-full">
          <div className="w-full flex justify-between">
            <span className="text-xl font-semibold tracking-wider text-[#f0f8ff]">
              Akash Kumar Sinha
            </span>
            <AiFillLike
              onClick={onClickLike}
              size={28}
              className="text-[#f0f8ff] hover:text-white transition-colors duration-300"
            />
          </div>
        </div>
        <div className="lg:hidden flex justify-between w-full md:px-4">
          <button onClick={toggleMenu} className="z-10">
            <PiCirclesThreePlusLight size={28} className="text-[#f0f8ff]" />
          </button>
          <AiFillLike
            onClick={onClickLike}
            size={28}
            className="text-[#f0f8ff] hover:text-white transition-colors duration-300"
          />
        </div>
      </div>
      <hr className="w-full h-1 bg-gradient-to-r lineColor" />
      {menuOpen && <MobileSidebar handleClick={handleClick} />}
    </div>
  );
};

export default Header;
