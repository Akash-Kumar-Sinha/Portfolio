import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import axios from "axios";
import useAboutSection from "../utils/Hooks/useAboutSection";
import Loading from "../utils/Loading";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

if (!SERVER_URL) {
  throw new Error("Server URL not found");
}

const Intro = () => {
  const { aboutSection, loading, error } = useAboutSection();
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

  if (loading || error) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex lg:w-2/5 w-full justify-center mb-8 lg:mb-0 mt-20 lg:mt-12">
        <div className="w-64 h-64 overflow-hidden rounded-full">
          <img
            src="profile.jpg"
            alt="Akash Kumar Sinha's profile"
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </div>
      </div>

      <div className="lg:w-3/5 w-full text-center lg:text-left flex flex-col justify-center items-center lg:items-start">
        <div className="text-4xl font-semibold text-[#f0f8ff] mb-2 font-sans">
          Akash Kumar Sinha
          <hr className="w-full h-1 border bg-gradient-to-r lineColor mt-4 mb-6 mx-auto lg:mx-0" />
        </div>

        <div className="text-xl font-light text-[#f0f8ff] mb-4 font-sans">
          {aboutSection?.title || "Loading title..."}
        </div>

        <p className="text-lg text-gray-400 mb-8 font-sans">
          {aboutSection?.description || "Loading description..."}
        </p>

        <div>
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-sans"
            onClick={handleContactClick}
          >
            Contact Me
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-zinc-950 p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold text-[#593CA1] mb-4 font-sans">
              Contact Me
            </h2>
            <form onSubmit={handleSubmit(onSubmitMessage)}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-200 font-sans"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: true })}
                  className="w-full bg-zinc-900 px-4 py-2 border border-gray-300 rounded-md mt-2 font-sans"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm font-sans">
                    Name is required.
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-200 font-sans"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                  className="w-full bg-zinc-900 px-4 py-2 border border-gray-300 rounded-md mt-2 font-sans"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm font-sans">
                    Email is required.
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-200 font-sans"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  {...register("message", { required: true })}
                  className="w-full bg-zinc-900 px-4 py-2 border border-gray-300 rounded-md mt-2 font-sans"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm font-sans">
                    Message is required.
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-sans"
                >
                  {sendingStatus ? "Sending..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-sans"
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
                } font-sans`}
              >
                {responseMessage}
              </div>
            )}

            <div className="mt-6 text-center relative">
              <p className="text-lg font-semibold text-[#f0f8ff] mb-2 font-sans">
                Or feel free to email me directly at:
              </p>
              <a
                href="mailto:akash.sinha.mail@gmail.com"
                className="text-blue-600 hover:text-blue-700 relative inline-block group"
              >
                akash.sinha.mail@gmail.com
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Intro;
