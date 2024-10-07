"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();

  const [profileData, setProfileData] = useState({
    name: "",
    mobile_no: "",
    whatsapp_no: "",
    email_optional: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    const getData = storedData ? JSON.parse(storedData) : null;
    if (!getData && !getData.token) {
      router.push("/");
      return;
    }
    console.log(getData, "getData");
    setLoading(true);
    setError("");

    axios
      .get(
        "https://api.aroundme.co.in/businessapp/BusinessOwnerView/?id=11120",
        {
          headers: {
            Authorization: `Bearer ${getData.token}`,
          },
        }
      )
      .then((response) => {
        setProfileData(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    const storedData = localStorage.getItem("data");
    const getData = storedData ? JSON.parse(storedData) : null;
    e.preventDefault();
    console.log("hello", profileData);
    const updatedProfile = {
      name: profileData.name,
      whatsapp_no: profileData.whatsapp_no,
    };

    axios
      .put(
        "https://api.aroundme.co.in/businessapp/BusinessOwner/edit/",
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${getData.token}`,
          },
        }
      )
      .then((response) => {
        console.log("Profile updated successfully", response.data);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to update profile.");
      });
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
    <div className="w-full h-full pt-10 px-24 profile">
      <h3 className="text-4xl text-center">PROFILE DATA</h3>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 form border-gray-300 border"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 border-stone-300 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-200"
              id="name"
              type="text"
              value={profileData.name}
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />
          </div>
          {/* mobile */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="mobile_no"
            >
              Mobile
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 border-stone-300 text-black-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-200"
              id="mobile_no"
              type="text"
              name="mobile_no"
              value={profileData.mobile_no}
              onChange={handleChange}
              readOnly
              placeholder="Mobile"
              required
            />
          </div>
          {/* whatsapp  */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="whatsapp_no"
            >
              Whats App
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 border-stone-300 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-200"
              id="whatsapp_no"
              name="whatsapp_no"
              type="text"
              value={profileData.whatsapp_no}
              onChange={handleChange}
              placeholder="What's App"
              required
            />
          </div>
          {/* email */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email_optional"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-stone-300  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-200"
              id="email_optional"
              name="email_optional"
              placeholder="Email"
              type="email_optional"
              readOnly
              value={profileData.email_optional}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Profile
          </button>
        </div>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </form>
    </div>
  );
};

export default Profile;
