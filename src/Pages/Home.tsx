import { useMemo, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import axios from "axios";

import DesktopSidebar from "../Components/SideBar/DesktopSidebar/DesktopSidebar";
import Header from "../Components/Header/Header";
import Intro from "../Components/Intro";
import Projects from "../Components/Project/Projects ";
import Skills from "../Components/Skills/Skills";
import Link from "../Components/Links/Link";
import { Path } from "../utils/types";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

if (!SERVER_URL) {
  throw new Error("Server URL not found");
}

const Home = () => {
  const [pathName, setPathName] = useState<Path>(Path.HOME);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [sendingStatus, setSendingStatus] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const handleContactClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onSubmitMessage: SubmitHandler<FieldValues> = async (data) => {
    setSendingStatus(true);
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        setResponseMessage("Please enter a valid email address.");
        return;
      }

      const response = await axios.post(
        `${SERVER_URL}/send_contact_email`,
        data
      );
      if (response.status === 200) {
        setResponseMessage("Message sent successfully!");
      }
      reset();
      closeModal();
    } catch (error) {
      console.error("Error sending message:", error);
      setResponseMessage("Failed to send message. Please try again.");
    } finally {
      setSendingStatus(false);
    }
  };

  const toggleMenu = useMemo(
    () => () => {
      setMenuOpen(!menuOpen);
    },
    [menuOpen]
  );

  const handleClick = (label: string) => {
    switch (label) {
      case "Home":
        setPathName(Path.HOME);
        setMenuOpen(false);
        break;
      case "Projects":
        setPathName(Path.PROJECTS);
        setMenuOpen(false);
        break;
      case "Skills":
        setPathName(Path.SKILLS);
        setMenuOpen(false);
        break;
      case "Links":
        setPathName(Path.LINKS);
        setMenuOpen(false);
        break;
      default:
        setPathName(Path.HOME);
        setMenuOpen(false);
    }
  };

  return (
    <div className="h-full flex flex-col pt-[72px] gap-4 overflow-auto">
      <Header
        handleContactClick={handleContactClick}
        handleClick={handleClick}
        toggleMenu={toggleMenu}
        menuOpen={menuOpen}
      />
      <div className="flex flex-1 relative gap-4 mb-2">
        <DesktopSidebar handleClick={handleClick} pathName={pathName} />

        <div className="bg-[#F5F5F5] lg:ml-32 w-full h-full overflow-auto mx-2 mb-2 flex flex-col lg:flex-row justify-center items-center rounded-xl">
          {pathName === Path.HOME && (
            <Intro handleContactClick={handleContactClick} />
          )}

          {pathName === Path.PROJECTS && <Projects />}
          {pathName === Path.SKILLS && <Skills />}
          {pathName === Path.LINKS && <Link />}
        </div>
        {isModalOpen && (
          <div className="para_font fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#222222] p-6 rounded-lg w-96 shadow-xl">
              <h2 className="text-2xl font-semibold text-[#FF8A00] mb-4 text-center">
                Let's Talk
              </h2>
              <form onSubmit={handleSubmit(onSubmitMessage)}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-300"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: true })}
                    className="w-full bg-[#333333] px-4 py-2 border border-[#444444] rounded-md mt-2"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">Name is required.</p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-300"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", { required: true })}
                    className="w-full bg-[#333333] px-4 py-2 border border-[#444444] rounded-md mt-2"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">Email is required.</p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-300"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    {...register("message", { required: true })}
                    className="w-full bg-[#333333] px-4 py-2 border border-[#444444] rounded-md mt-2"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm">Message is required.</p>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-[#FF6347] to-[#FF8A00] text-white rounded-lg hover:from-[#FF8A00] hover:to-[#FF6347] transition-all"
                  >
                    {sendingStatus ? "Sending..." : "Submit"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
                  >
                    Close
                  </button>
                </div>
              </form>

              {responseMessage && (
                <div
                  className={`mt-4 text-center text-lg font-semibold ${
                    responseMessage.includes("successfully")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {responseMessage}
                </div>
              )}

              <div className="mt-6 text-center relative">
                <p className="text-lg font-semibold text-[#f0f8ff] mb-2">
                  Or feel free to email me directly at:
                </p>
                <a
                  href="mailto:akash.sinha.mail@gmail.com"
                  className="text-[#FF6347] hover:text-[#FF8A00] relative inline-block group"
                >
                  akash.sinha.mail@gmail.com
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF8A00] group-hover:w-full transition-all duration-300"></span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
