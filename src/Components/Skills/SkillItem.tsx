import { motion } from "framer-motion";

interface SkillItemProps {
  id: string;
  name: string;
  image: string;
}

const SkillItem: React.FC<SkillItemProps> = ({ name, image }) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={(_event, info) => {
        info.point.x = 0;
        info.point.y = 0;
      }}
      className="flex flex-col justify-center items-center p-6 rounded-lg shadow-lg w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 group"
      whileHover={{
        scale: 1.05,
        rotate: 5,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      initial={{ scale: 1, opacity: 0.8 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      style={{
        background: "linear-gradient(to bottom right, #F5F5F5, #b6b6b6)",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        dangerouslySetInnerHTML={{ __html: image }}
        className="w-16 h-16 sm:w-20 sm:h-20 mb-4 text-gray-800 group-hover:text-white transition-all duration-300"
        initial={{ rotateX: 0, rotateY: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          transformStyle: "preserve-3d",
        }}
      />
      <motion.span
        className="text-lg text-[#232323] group-hover:text-[#f6671b] font-semibold transition-all duration-300 text-center"
        whileHover={{ color: "#ff80ed" }}
        transition={{ duration: 0.3 }}
      >
        {name}
      </motion.span>
    </motion.div>
  );
};

export default SkillItem;
