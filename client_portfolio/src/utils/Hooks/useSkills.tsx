import { useState, useEffect } from "react";
import axios from "axios";

interface Skill {
  id: string;
  name: string;
  image: string;
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

if (!SERVER_URL) {
  throw new Error("Server URL not found");
}

const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      

      const response = await axios.get(`${SERVER_URL}/skills`,);
      console.log(response);
      if (Array.isArray(response.data)) {
        setSkills(response.data);
      } else {
        setError("Invalid skills data received.");
      }
    } catch (err) {
      setError("Failed to fetch skills. Please try again later.");
      console.error("Error fetching skills:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);
  return { skills, loading, error, fetchSkills };
};

export default useSkills;
