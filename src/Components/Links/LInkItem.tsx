import React from "react";
import { Link } from "react-router-dom";

interface LInkItemProps {
  name: string;
  url: string;
  icon: string;
}

const LInkItem: React.FC<LInkItemProps> = ({ name, url, icon }) => {
  return (
    <Link
      to={url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center w-36 lg:w-40 justify-center flex-wrap border gap-1 text-xl text-[#232323] font-medium hover:text-[#F6671B] group transition-all duration-300 transform hover:scale-105 bg-[#F5F5F5] p-2 rounded-lg shadow-sm hover:shadow-md"
    >
      <span
        dangerouslySetInnerHTML={{ __html: icon }}
        className="w-6 h-6 group-hover:text-[#F6671B] transition-all duration-300 mt-1"
      ></span>
      <span className="text-[#232323] group-hover:text-[#F6671B] transition-all duration-300">
        {name}
      </span>

      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F6671B] transition-all duration-300 group-hover:w-full"></span>
      <span className="absolute inset-0 bg-transparent group-hover:shadow-lg transition-all duration-300 rounded-md"></span>
    </Link>
  );
};

export default LInkItem;
