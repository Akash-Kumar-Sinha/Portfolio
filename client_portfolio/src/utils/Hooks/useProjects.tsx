import { useEffect, useState } from "react";
import axios from "axios";
import { PORTFOLIO_TOKEN } from "../../utils/types";

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
  githubLink?: string;
}

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem(PORTFOLIO_TOKEN);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, error, fetchProjects };
};

export default useProjects;
