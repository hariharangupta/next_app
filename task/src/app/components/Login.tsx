"use client";
import React, { useState } from "react";
import Image from "next/image";
import img from "../../../public/images/img.jpg";
import { useRouter } from "next/navigation";
import axios from "axios";

const LogIn: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const data = { username, password };

    try {
      const response = await axios.post(
        "https://api.aroundme.co.in/login/businesslogin/",
        data
      );
      const dataToStore = {
        token: response.data.access,
        id: response.data.id,
      };

      if (dataToStore.token) {
        router.push("/");
        localStorage.setItem("data", JSON.stringify(dataToStore));
      }
      console.log(response.data);
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";

      if (typeof error === "object" && error !== null) {
        if ("response" in error) {
          const responseError = error as {
            response?: { data?: { message?: string } };
          };
          errorMessage =
            responseError.response?.data?.message || "Login failed";
        } else if ("message" in error) {
          errorMessage = (error as Error).message;
        }
      }

      console.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen main">
        <h1>Error</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen main">
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen main">
      <div className="lg:flex justify-center w-full ">
        <Image src={img} width={450} height={500} alt="Picture of the author" />
        <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-1/3">
          <h1 className="font-bold text-xl">Welcome...!</h1>
          <p className="font-bold mb-4">Login</p>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-bold text-gray-700 "
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-black text-white font-bold py-2 rounded hover:bg-stone-800 transition duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
