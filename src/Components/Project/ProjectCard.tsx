import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  imgLink: string;
  icon: string;
  label: string;
  description: string;
  link: string;
  githubLink: string;
  divRef: React.RefObject<HTMLDivElement>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  divRef,
  imgLink,
  icon,
  label,
  description,
  link,
  githubLink,
}) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      ref={divRef}
      className="flex flex-col items-center bg-[#232323] rounded-xl shadow-2xl p-4 py-6 lg:w-96 w-80 transition-transform hover:scale-105 hover:shadow-2xl"
      initial={{ scale: 1 }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 1.02 }}
    >
      <div className="w-full h-auto bg-gray-200 border border-[#F5F5F5] rounded-lg overflow-hidden mb-6 relative shadow-lg hover:shadow-2xl transition-all duration-500">
        <img
          src={imgLink}
          alt={label}
          className="w-fit object-contain transition-transform duration-300 ease-in-out hover:scale-110 rounded-lg"
        />
      </div>
      <Link to={link}>
        <div className="flex items-center justify-center mb-2">
          <div className="text-[#f6671b] text-2xl transition-transform duration-300 transform hover:scale-125">
            <div dangerouslySetInnerHTML={{ __html: icon }} />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-[#f6671b] hover:text-[#F6671B] transition-all duration-300 text-center">
          {label}
        </h3>
      </Link>

      <p className="mt-1 text-sm text-[#F5F5F5] text-center font-light transition-opacity duration-300 opacity-80 hover:opacity-100">
        {description}
      </p>
      
      {githubLink && (
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center mt-4 text-[#F5F5F5] hover:text-[#f6671b] transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M12 0C5.37 0 0 5.37 0 12c0 5.28 3.44 9.8 8.2 11.4.6.1.8-.26.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.54-1.4-1.32-1.8-1.32-1.8-1.08-.72.08-.72.08-.72 1.2.08 1.82 1.2 1.82 1.2 1.08 1.8 2.82 1.3 3.5 1 .6-.7.92-1.3 1.1-2.2-2.6-.3-5.4-1.3-5.4-5.6 0-1.2.44-2.2 1.1-3-.11-.3-.5-1.4.1-2.8 0 0 .9-.3 3 .9 1.4-.4 2.8-.7 4.2-.7 1.4 0 2.8.3 4.2.7 2.1-1.2 3-1.3 3-1.3-.6 1.4.1 2.6 1.1 3 0 4.4-2.8 5.2-5.4 5.6.6.5 1.2 1.5 1.2 2.8v4.4c0 .3.2.7.8.6 4.8-1.6 8.2-6.2 8.2-11.4 0-6.63-5.37-12-12-12z"
            />
          </svg>
          <span>GitHub</span>
        </a>
      )}
    </motion.div>
  );
};

export default ProjectCard;
