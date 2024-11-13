import { useState } from "react";
import axios from "axios";

import useSkills from "../../utils/Hooks/useSkills";
import { PORTFOLIO_TOKEN } from "../../utils/types";
import Loading from "../../utils/Loading";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

if (!SERVER_URL) {
  throw new Error("Server URL not found");
}

const SkillsContent = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const { skills, loading, error, fetchSkills } = useSkills();
  const token = localStorage.getItem(PORTFOLIO_TOKEN);

  const addSkill = async () => {
    if (!token) {
      console.error("Token is missing");
      return;
    }

    try {
      const response = await axios.post(
        `${SERVER_URL}/skills`,
        { name, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setName("");
        setImage("");
        fetchSkills();
      }
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  const editSkill = async () => {
    if (!editId) return;

    if (!token) {
      console.error("Token is missing");
      return;
    }

    try {
      const response = await axios.put(
        `${SERVER_URL}/skills/${editId}`,
        { name, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setEditId(null);
        setName("");
        setImage("");
        fetchSkills();
      }
    } catch (error) {
      console.error("Error editing skill:", error);
    }
  };

  const deleteSkill = async (id: string) => {
    if (!token) {
      console.error("Token is missing");
      return;
    }

    try {
      await axios.delete(`${SERVER_URL}/skills/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchSkills();
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  if (loading || error) {
    return <Loading />;
  }

  return (
    <div className="w-full mx-auto text-white space-y-4">
      <h1 className="text-2xl font-semibold text-center mb-3">Skills</h1>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-2/5 space-y-2">
          <p>https://reactsvgicons.com/</p>
          <h2 className="text-lg font-medium">Add / Edit Skill</h2>

          <input
            type="text"
            placeholder="Skill Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-zinc-950 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />

          <textarea
            placeholder="SVG Content"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full bg-zinc-950 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 h-20 text-sm"
          />

          <button
            onClick={editId ? editSkill : addSkill}
            className="w-full py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
          >
            {editId ? "Update Skill" : "Add Skill"}
          </button>
        </div>

        <div className="w-full md:w-3/5">
          <ul className="space-y-2">
            {skills.length === 0 ? (
              <li className="text-center text-gray-500">No skills found</li>
            ) : (
              skills.map((skill) => (
                <li
                  key={skill.id}
                  className="flex justify-between items-center bg-gray-800 rounded-md p-2 shadow-sm hover:shadow-md transition text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      dangerouslySetInnerHTML={{ __html: skill.image }}
                      className="transform scale-50"
                    />
                    <span className="font-medium">{skill.name}</span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditId(skill.id);
                        setName(skill.name);
                        setImage(skill.image);
                      }}
                      className="px-2 text-yellow-500 hover:text-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteSkill(skill.id)}
                      className="px-2 text-red-500 hover:text-red-600 transition"
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

export default SkillsContent;
