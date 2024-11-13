import React from "react";

interface LInkItemProps {
  name: string;
  url: string;
  icon: string;
}

const LInkItem: React.FC<LInkItemProps> = ({ name, url, icon }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center gap-1 text-xl text-gray-300 font-medium hover:text-blue-500 group transition-all duration-300 transform hover:scale-105"
    >
      <span
        dangerouslySetInnerHTML={{ __html: icon }}
        className="w-6 h-6 text-gray-100 group-hover:text-blue-500 transition-all duration-300 mt-1"
      ></span>
      <span className="text-gray-300 group-hover:text-blue-500 transition-all duration-300">
        {name}
      </span>

      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
      <span className="absolute inset-0 bg-transparent group-hover:shadow-lg transition-all duration-300 rounded-md"></span>
    </a>
  );
};

export default LInkItem;
