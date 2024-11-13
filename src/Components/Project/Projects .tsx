import { useRef, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { motion } from "framer-motion";

import UseProjectData from "./UseProjectData";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const projectData = UseProjectData();
  const divRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projectData.length);
  };

  const goToProject = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <motion.div
          key={projectData[currentIndex].label}
          ref={divRef}
          className="flex flex-col items-center justify-center w-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <ProjectCard
            imgLink={projectData[currentIndex].imgLink}
            icon={projectData[currentIndex].icon}
            label={projectData[currentIndex].label}
            description={projectData[currentIndex].description}
            divRef={divRef}
          />
          <div className="flex mt-6 space-x-3">
            {projectData.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white" : "bg-gray-300"
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </motion.div>
        <button
          onClick={nextProject}
          className="ml-3 p-3 rounded-full bg-[#0ff] text-white shadow-lg bg-opacity-80 hover:bg-opacity-100 transition"
        >
          <MdOutlineKeyboardArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Projects;
