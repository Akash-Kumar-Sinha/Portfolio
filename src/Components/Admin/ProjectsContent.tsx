import React, { useState } from "react";
import axios from "axios";
import { PORTFOLIO_TOKEN } from "../../utils/types";
import Loading from "../../utils/Loading";
import useProjects from "../../utils/Hooks/useProjects";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

if (!SERVER_URL) {
  throw new Error("Server URL not found");
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  icon: string;
}

const ProjectsContent: React.FC = () => {
  const { projects, loading, error, fetchProjects } = useProjects();
  const [formData, setFormData] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    image: "",
    link: "",
    icon: "",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const token = localStorage.getItem(PORTFOLIO_TOKEN);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", image: "", link: "", icon: "" });
    setEditId(null);
  };

  const addProject = async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/projects`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        resetForm();
        fetchProjects();
      }
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const editProject = async () => {
    if (!editId) return;

    try {
      const response = await axios.put(
        `${SERVER_URL}/projects/${editId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        resetForm();
        fetchProjects();
      }
    } catch (error) {
      console.error("Error editing project:", error);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await axios.delete(`${SERVER_URL}/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProjects();
      resetForm();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleFormSubmit = () => {
    if (editId) {
      editProject();
    } else {
      addProject();
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full mx-auto text-white h-full">
      <h1 className="text-3xl font-bold text-center mb-4">Projects</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col w-full md:w-1/3 gap-4 bg-zinc-950 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-medium text-gray-300">
            Add / Edit Project
          </h2>

          {["title", "description", "image", "link", "icon"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={`Project ${
                field.charAt(0).toUpperCase() + field.slice(1)
              }`}
              value={formData[field as keyof typeof formData]}
              onChange={handleInputChange}
              className="w-full bg-zinc-900 text-sm p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          ))}

          <button
            onClick={handleFormSubmit}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            {editId ? "Update Project" : "Add Project"}
          </button>
        </div>

        <div className="w-full md:w-2/3">
          <ul className="space-y-6">
            {projects.length === 0 ? (
              <li className="text-center text-gray-500">No projects found</li>
            ) : (
              projects.map((project) => (
                <li
                  key={project.id}
                  className="flex justify-between items-center bg-zinc-950 rounded-md p-4 shadow-md hover:shadow-xl transition-all duration-200"
                >
                  <div className="flex gap-6 w-full">
                    <div className="flex flex-col gap-2 flex-1">
                      <span className="text-xl font-semibold text-white">
                        {project.title}
                      </span>
                      <p className="text-sm text-gray-400">
                        {project.description}
                      </p>
                    </div>
                    <div>
                      {project.image && (
                        <p className="text-blue-500 text-sm hover:text-blue-600 transition">
                          {project.image}
                        </p>
                      )}
                      {project.link && (
                        <p className="text-blue-500 text-sm hover:text-blue-600 transition">
                          {project.link}
                        </p>
                      )}
                      {project.icon && (
                        <p className="text-blue-500 text-sm hover:text-blue-600 transition">
                          {project.icon}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setEditId(project.id);
                        setFormData({
                          title: project.title,
                          description: project.description || "",
                          image: project.image,
                          link: project.link,
                          icon: project.icon || "",
                        });
                      }}
                      className="px-4 py-2 text-yellow-500 hover:text-yellow-600 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="px-4 py-2 text-red-500 hover:text-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectsContent;
