import { useState, useEffect } from "react";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

if (!SERVER_URL) {
  throw new Error("Server URL not found");
}

interface AboutSection {
  title: string;
  description: string;
  image?: string;
}

const useAboutSection = () => {
  const [aboutSection, setAboutSection] = useState<AboutSection | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutSection = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/getAbout`);
        if (response.data && response.data.length > 0) {
          setAboutSection(response.data[0]);
        } else {
          setAboutSection(null);
        }
      } catch (error) {
        setError("Failed to fetch about section");
        console.error("Failed to fetch about section:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutSection();
  }, []);

  return { aboutSection, loading, error };
};

export default useAboutSection;
