import { useState, useEffect } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import axios from "axios";

import useFetchLinks from "../../utils/Hooks/useFetchLinks";
import { PORTFOLIO_TOKEN } from "../../utils/types";
import Loading from "../../utils/Loading";

interface Link {
  id: string;
  name: string;
  icon: string;
  url: string;
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

if (!SERVER_URL) {
  throw new Error("Server URL not found");
}

const LinksContent = () => {
  const { links, setLinks, isLoading, error } = useFetchLinks();
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem(PORTFOLIO_TOKEN);
    if (savedToken) {
      setToken(savedToken);
    } else {
      console.error("No token found");
    }
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmitLink: SubmitHandler<FieldValues> = async (data) => {
    const token = localStorage.getItem(PORTFOLIO_TOKEN);

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    if (editingLink) {
      try {
        await axios.put(`${SERVER_URL}/links/${editingLink.id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLinks((prevLinks) =>
          prevLinks.map((link) =>
            link.id === editingLink.id ? { ...link, ...data } : link
          )
        );
        setEditingLink(null);
        reset({ name: "", icon: "", url: "" });
      } catch (error) {
        console.error("Error updating link:", error);
      }
    } else {
      try {
        const newLink: Link = {
          id: Math.random().toString(36).substring(7),
          name: data.name,
          icon: data.icon,
          url: data.url,
        };

        await axios.post(`${SERVER_URL}/links`, newLink, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLinks((prevLinks) => [...prevLinks, newLink]);
        reset({ name: "", icon: "", url: "" });
      } catch (error) {
        console.error("Error adding link:", error);
      }
    }
  };

  const handleEdit = (link: Link) => {
    setEditingLink(link);
    reset(link);
  };

  const handleDelete = async (newLinkId: string) => {
    try {
      if (!token) {
        console.error("No authentication token found");
        return;
      }
      await axios.delete(`${SERVER_URL}/links/${newLinkId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLinks((prevLinks) =>
        prevLinks.filter((link) => link.id !== newLinkId)
      );
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  if (isLoading || error) {
    return <Loading />;
  }

  return (
    <div className="w-full flex flex-col sm:flex-row gap-6 justify-center max-w-5xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmitLink)}
        className="border border-gray-700 rounded-lg w-full sm:w-1/3 p-6 bg-zinc-800 shadow-lg"
      >
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-200 text-center mb-4">
            {editingLink ? "Edit Link" : "Add New Link"}
          </h2>
          <div>
            <input
              {...register("name", { required: "Link name is required" })}
              placeholder="Link Name"
              className="w-full bg-zinc-900 p-3 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message?.toString()}
              </span>
            )}
          </div>

          <div>
            <input
              {...register("icon", { required: "Link icon is required" })}
              placeholder="Link Icon (URL or emoji)"
              className="w-full bg-zinc-900 p-3 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.icon && (
              <span className="text-sm text-red-500">
                {errors.icon.message?.toString()}
              </span>
            )}
          </div>

          <div>
            <input
              {...register("url", { required: "Link URL is required" })}
              placeholder="Link URL"
              className="w-full bg-zinc-900 p-3 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.url && (
              <span className="text-sm text-red-500">
                {errors.url.message?.toString()}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 p-3 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            {editingLink ? "Update Link" : "Add Link"}
          </button>
        </div>
      </form>
      <div className="flex-1 w-full">
        {Array.isArray(links) && links.length > 0 ? (
          <div className="space-y-4">
            {links.map((link) => (
              <div
                key={link.id}
                className="bg-gray-700 p-4 rounded-md shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">
                    {link.name}
                  </h3>
                  <p className="text-sm text-gray-400 truncate">{link.url}</p>
                </div>
                <div className="flex mt-4 sm:mt-0 space-x-4">
                  <button
                    className="text-blue-400 hover:text-blue-500 text-sm"
                    onClick={() => handleEdit(link)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-400 hover:text-red-500 text-sm"
                    onClick={() => handleDelete(link.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-200 text-center">No links found</p>
        )}
      </div>
    </div>
  );
};

export default LinksContent;
