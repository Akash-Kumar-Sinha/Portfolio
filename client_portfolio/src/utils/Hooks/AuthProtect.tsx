import React, { ReactNode, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { PORTFOLIO_TOKEN } from "../types";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

if (!SERVER_URL) {
  throw new Error("Server URL not found");
}

interface AuthProtectProps {
  children: ReactNode;
}

const AuthProtect: React.FC<AuthProtectProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Start with null for uninitialized state
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthentication = async (token: string) => {
    try {
      const response = await axios.get(`${SERVER_URL}/check_auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsAuthenticated(response.data.isAuthenticated ?? false); // Handle undefined or null response
    } catch (error) {
      console.error("Authentication check failed:", error);
      setIsAuthenticated(false); // Set false if error occurs
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(PORTFOLIO_TOKEN);
    
    if (!token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    checkAuthentication(token); // Validate token if exists
  }, [navigate]);

  if (isLoading) {
    return <>Loading...</>; // Display loading state
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // Redirect if not authenticated
  }

  return <>{children}</>; // Render children if authenticated
};

export default AuthProtect;
