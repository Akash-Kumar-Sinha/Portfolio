import { motion } from "framer-motion";
import useSkills from "../../utils/Hooks/useSkills";
import SkillItem from "./SkillItem";
import Loading from "../../utils/Loading";

const Skills = () => {
  const { skills, loading, error } = useSkills();

  if (loading||error) {
    return <Loading />;
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-start px-4 py-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-4xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#FF6F61] to-[#D4A5A5] mb-8">
        Skills
      </h2>
      <motion.div
        className="flex flex-wrap justify-center gap-6 w-full overflow-visible"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              delayChildren: 0.3,
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SkillItem {...skill} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
  
};

export default Skills;
