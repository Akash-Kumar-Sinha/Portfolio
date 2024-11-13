import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";

import { PORTFOLIO_TOKEN } from "../../utils/types";
import useAboutSection from "../../utils/Hooks/useAboutSection";
import Loading from "../../utils/Loading";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

if (!SERVER_URL) {
  throw new Error("Server URL not found");
}

const AboutContent = () => {
  const [token, setToken] = useState<string | null>(null);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  const { aboutSection, loading, error } = useAboutSection();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const savedToken = localStorage.getItem(PORTFOLIO_TOKEN);
    if (savedToken) {
      setToken(savedToken);
    } else {
      console.error("No token found");
    }
  }, []);

  const onSubmitAbout: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await axios.put(`${SERVER_URL}/editAbout`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setUpdateMessage("About section updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update about section:", error);
      setUpdateMessage("There was an error updating the About section.");
    }
  };

  if (loading || error) {
    return <Loading />;
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-black rounded-lg shadow-lg">
      <h2 className="text-2xl text-gray-200 mb-6 text-center">
        {aboutSection ? "Edit About Section" : "Add About Section"}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmitAbout)}
        className="flex flex-col space-y-4"
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="bg-zinc-800 p-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">
              {errors.title.message?.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-gray-300 mb-2">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={4}
            className="bg-zinc-800 p-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">
              {errors.description.message?.toString()}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-md mt-4 hover:bg-blue-700 transition"
        >
          {aboutSection ? "Update About Section" : "Add About Section"}
        </button>
      </form>

      {aboutSection === null && (
        <div className="text-center text-gray-300 mt-4">
          <p>The About section is currently empty. You can add it now.</p>
        </div>
      )}

      {aboutSection && (
       <button
       type="button"
       onClick={() => reset(aboutSection)}
       className="bg-blue-950 text-white p-3 rounded-md mt-4 hover:bg-blue-800 transition"     >
       Edit Section
     </button>
     
      )}

      {updateMessage && (
        <div
          className={`mt-4 p-2 text-center rounded-md ${
            updateMessage.includes("error") ? "bg-red-600" : "bg-green-600"
          } text-white`}
        >
          {updateMessage}
        </div>
      )}
    </div>
  );
};

export default AboutContent;
