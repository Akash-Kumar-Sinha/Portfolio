import { IoIosArrowRoundForward } from "react-icons/io";

import useAboutSection from "../utils/Hooks/useAboutSection";
import Loading from "../utils/Loading";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

if (!SERVER_URL) {
  throw new Error("Server URL not found");
}

const Intro = ({handleContactClick}:{handleContactClick:()=>void}) => {
  const { aboutSection, loading, error } = useAboutSection();

  if (loading || error) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex lg:w-2/5 w-full justify-center mb-8 lg:mb-0 mt-20 lg:mt-12">
        <div className="w-64 h-64 overflow-hidden rounded-full shadow-lg">
          <img
            src="profile.jpg"
            alt="Akash Kumar Sinha's profile"
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </div>
      </div>
  
      <div className="lg:w-3/5 w-full text-center lg:text-left flex flex-col justify-center items-center lg:items-start">
        <div className="lg:text-4xl text-2xl font-semibold mb-1 text-[#4A4A4A]">
          Akash Kumar Sinha
          <hr className="w-full h-1 border bg-gradient-to-r from-[#FF8A00] to-[#FF6347] mt-4 mb-2 mx-auto lg:mx-0" />
        </div>
  
        <div className="para_font text-xl font-semibold text-[#333333] mb-4">
          {aboutSection?.title || "Loading title..."}
        </div>
  
        <p className="para_font text-lg text-gray-700 mb-8 mr-2 px-3 lg:px-0">
          {aboutSection?.description || "Loading description..."}
        </p>
  
        <div className="pb-8 lg:p-0">
          <button
            className="flex items-center px-6 py-3 bg-gradient-to-r from-[#FF6347] to-[#FF8A00] text-white rounded-lg hover:from-[#FF8A00] hover:to-[#FF6347] transition-all"
            onClick={handleContactClick}
          >
            Let's Talk <IoIosArrowRoundForward size={28}/>
          </button>
        </div>
      </div>
  
      
    </>
  );
  
};

export default Intro;
