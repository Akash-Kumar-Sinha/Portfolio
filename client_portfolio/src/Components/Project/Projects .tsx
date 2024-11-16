import { useRef, useState, useCallback } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { motion } from "framer-motion";

import ProjectCard from "./ProjectCard";
import useProjects from "../../utils/Hooks/useProjects";
import Loading from "../../utils/Loading";

const Projects = () => {

  const { projects, loading, error } = useProjects();
  const divRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  }, [projects.length]);

  const goToProject = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  if (loading || error) return <Loading/>

  if (projects.length === 0) return <div>No projects available.</div>;


  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <motion.div
          key={projects[currentIndex].title}
          ref={divRef}
          className="flex flex-col items-center justify-center w-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <ProjectCard
            imgLink={projects[currentIndex].image}
            icon={projects[currentIndex].icon}
            label={projects[currentIndex].title}
            description={projects[currentIndex].description}
            link={projects[currentIndex].link}
            githubLink={projects[currentIndex].githubLink || ""}
            divRef={divRef}
          />
          <div className="flex mt-6 space-x-3">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-[#F6671B]" : "bg-[#5A6D99]"
                }`}
                whileHover={{ scale: 1.2 }}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
        <button
          onClick={nextProject}
          className="ml-3 p-3 rounded-full bg-[#f6671b] text-white shadow-lg shadow-black bg-opacity-80 hover:bg-opacity-100 transition-transform transform hover:scale-105"
          aria-label="Next project"
        >
          <MdOutlineKeyboardArrowRight size={24} />
        </button>
      </div>
    </div>
  );
  
};


export default Projects;
