import React, { memo } from "react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  imgLink: string;
  icon: string;
  label: string;
  description: string;
  divRef: React.RefObject<HTMLDivElement>;
}

const ProjectCard: React.FC<ProjectCardProps> = memo(
  ({ divRef, imgLink, icon, label, description }) => {
    return (
      <motion.div
        drag
        dragConstraints={divRef}
        className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 w-80"
        initial={{ scale: 1 }}
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.4 },
        }}
        whileTap={{ scale: 1.05 }}
      >
        <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={imgLink}
            alt={label}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="mt-4 flex items-center justify-center">
          <div
            className="text-blue-500"
            dangerouslySetInnerHTML={{ __html: icon }}
          />
        </div>
        <h3 className="mt-2 text-lg font-semibold text-zinc-950">{label}</h3>
        <p className="mt-1 text-sm text-gray-600 text-center">{description}</p>
      </motion.div>
    );
  }
);

export default ProjectCard;
