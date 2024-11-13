import React, { useEffect, useState } from "react";
import { PiCirclesThreePlusLight } from "react-icons/pi";
import { AiFillLike } from "react-icons/ai";
import axios from "axios";

import MobileSidebar from "../SideBar/MobileBar/MobileSidebar";

interface HeaderProps {
  toggleMenu: () => void;
  handleClick: (label: string) => void;
  menuOpen: boolean;
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

if (!SERVER_URL) {
  throw new Error("Server URL not found");
}

const Header: React.FC<HeaderProps> = ({
  toggleMenu,
  handleClick,
  menuOpen,
}) => {
  const [likeCount, setLikeCount] = useState(0);
  const [likeClicked, setLikeClicked] = useState(false);

  const onClickLike = async () => {
    try {
      await axios.put(`${SERVER_URL}/likes`);
      setLikeClicked(true);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/likes`);
        if (res.status === 200) {
          setLikeCount(res.data.likes);
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
    const intervalId = setInterval(fetchLikes, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (likeClicked) {
      const timer = setTimeout(() => setLikeClicked(false), 300);
      return () => clearTimeout(timer);
    }
  }, [likeClicked]);

  return (
    <div className="bg-zinc-950 fixed top-0 left-0 w-full z-10 lg:px-8 px-4">
      <div className="flex justify-between items-center p-4">
        <div className="hidden lg:block w-full">
          <div className="w-full flex justify-between">
            <span className="text-xl font-semibold tracking-wider text-[#f0f8ff]">
              Akash Kumar Sinha
            </span>
            <div className="flex items-center justify-center">
              <AiFillLike
                onClick={onClickLike}
                size={28}
                className={`text-[#f0f8ff] hover:text-white transition-colors duration-300 ${
                  likeClicked ? "animate-bounce" : ""
                }`}
              />
              <span className="text-xs mt-2">{likeCount}</span>
            </div>
          </div>
        </div>
        <div className="lg:hidden flex justify-between w-full md:px-4">
          <button onClick={toggleMenu} className="z-10">
            <PiCirclesThreePlusLight size={28} className="text-[#f0f8ff]" />
          </button>
          <div>
            <AiFillLike
              onClick={onClickLike}
              size={28}
              className={`text-[#f0f8ff] hover:text-white transition-colors duration-300 ${
                likeClicked ? "animate-bounce" : ""
              }`}
            />
            {likeCount}
          </div>
        </div>
      </div>
      <hr className="w-full h-1 bg-gradient-to-r lineColor" />
      {menuOpen && <MobileSidebar handleClick={handleClick} />}
    </div>
  );
};

export default Header;
