import React, { useEffect, useState } from "react";

const Headers = () => {
  const [doctor, setDoctor] = useState("");

  useEffect(() => {
    // Fetch and parse doctor details from localStorage
    const doctorData = localStorage.getItem("doctor");
    if (doctorData) {
      setDoctor(JSON.parse(doctorData));
    }
  }, []);
  return (
    <div className=" flex  w-[96%] bg-white fixed z-10  h-14 border-b ">
      <div className=" flex items-center justify-between w-full">
        <h1 className="text-2xl font-semibold ml-5 text-gray-800">
          Welcome, {doctor.firstName} {doctor.lastName}
        </h1>
      </div>
      <div className=" flex gap-2 mr-4">
        {/* notification button  */}
        <div className=" rounded-md flex justify-center items-center bg-gray-50 m-2  p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
        </div>
        {/* Avatar  */}
        <div className="rounded-md bg-gray-50 m-2 p-2 text-black flex items-center justify-center">
          {doctor && doctor.profilePic ? (
            <img
              src={doctor.profilePic}
              alt="Avatar"
              className="rounded-full w-12 h-8"
            />
          ) : (
            <h1 className="font-bold text-2xl">
              {doctor.firstName?.[0].toUpperCase() || "?"}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Headers;
