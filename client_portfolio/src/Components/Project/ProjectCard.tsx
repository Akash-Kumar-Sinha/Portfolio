import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  imgLink: string;
  icon: string;
  label: string;
  description: string;
  link: string;
  divRef: React.RefObject<HTMLDivElement>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  divRef,
  imgLink,
  icon,
  label,
  description,
  link,
}) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      ref={divRef}
      className="flex flex-col items-center bg-[#232323] rounded-xl shadow-2xl p-4 py-6 w-96 transition-transform hover:scale-105 hover:shadow-2xl"
      initial={{ scale: 1 }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 1.02 }}
    >
      <div className="w-full h-56 bg-gray-200 border border-[#F5F5F5] rounded-lg overflow-hidden mb-6 relative shadow-lg hover:shadow-2xl transition-all duration-500">
        <img
          src={imgLink}
          alt={label}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 rounded-lg"
          loading="lazy"
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

        <p className="mt-1 text-sm text-[#F5F5F5] text-center font-light transition-opacity duration-300 opacity-80 hover:opacity-100">
          {description}
        </p>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
