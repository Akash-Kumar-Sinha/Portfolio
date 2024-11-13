import { useState, useEffect } from "react";
import axios from "axios";

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

const useFetchLinks = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchLinks = async () => {
      try {
      

        const response = await axios.get(`${SERVER_URL}/links`, );

        if (response.status !== 200) {
          console.log(response);
          throw new Error("Failed to fetch links");
        }

        setLinks(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(`Failed to fetch links: ${error}`);
        console.error("Error fetching links:", error);
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, []);

  return { links, setLinks, isLoading, error };
};

export default useFetchLinks;
