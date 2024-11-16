import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { PORTFOLIO_TOKEN } from "../../utils/types";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

if (!SERVER_URL) {
  throw new Error("Server URL not found");
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: string }>({
    text: "",
    type: "",
  });

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const handleEmailVerification = async (email: string) => {
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const response = await axios.post(`${SERVER_URL}/auth_check`, { email });
      if (response.data.phase === "SENT") {
        setMailSent(true);
        setMessage({
          text: "Email sent successfully. Please check your inbox.",
          type: "success",
        });
      }
    } catch (error) {
      console.log("Error sending email verification", error);
      setMessage({
        text: "Error sending verification email. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckVerification = async () => {
    const data = watch();
    const email = data.email;
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const response = await axios.get(`${SERVER_URL}/check_verification`, {
        params: { email },
      });
      if (response.data.phase === "VERIFIED") {
        setMessage({ text: "Email successfully verified.", type: "success" });
        setVerifyEmail(true);
      } else {
        setMessage({
          text: "Email is not verified. Please check your inbox.",
          type: "info",
        });
      }
    } catch (error) {
      console.log("Error checking verification", error);
      setMessage({
        text: "Error checking verification status. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmitAdmin: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const response = await axios.post(`${SERVER_URL}/login`, data);
      if (response.data.phase === "SUCCESS") {
        localStorage.setItem(PORTFOLIO_TOKEN, response.data.token);
        setMessage({
          text: "Login successful!",
          type: "success",
        });
        navigate("/aks_admin_private");
      } else {
        setMessage({
          text: "Invalid credentials. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.log("Error during login", error);
      setMessage({
        text: "Login failed. Please check your credentials and try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const email = watch("email");

  return (
    <div className="h-full flex flex-col justify-center items-center p-6">
      <h2 className="text-3xl font-semibold mb-4">Admin Panel</h2>

      <form
        onSubmit={handleSubmit(onSubmitAdmin)}
        className="w-full max-w-md text-black selection:text-gray-500"
      >
        {!verifyEmail ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 p-3 mb-4 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm bg-transparent">
                {errors.email?.message?.toString()}
              </p>
            )}

            {mailSent ? (
              <button
                type="button"
                onClick={handleCheckVerification}
                className="bg-blue-500 text-white p-3 w-full rounded-lg mt-4 disabled:opacity-50"
                disabled={loading || !email}
              >
                {loading ? "Checking..." : "Check Verification Status"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleEmailVerification(email)}
                className="bg-blue-500 text-white p-3 w-full rounded-lg mt-4 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Sending..." : "Verify Email"}
              </button>
            )}
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Username"
              className="border border-gray-300 p-3 mb-4 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">
                {errors.username?.message?.toString()}
              </p>
            )}

            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 p-3 mb-4 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password?.message?.toString()}
              </p>
            )}

            <button
              type="submit"
              className="bg-blue-500 text-white p-3 w-full rounded-lg disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Access"}
            </button>
          </>
        )}

        {message.text && (
          <p
            className={`mt-4 text-lg text-center p-2 rounded-lg ${
              message.type === "success"
                ? "bg-green-200 text-green-800"
                : message.type === "error"
                ? "bg-red-200 text-red-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
};

export default AdminPanel;
