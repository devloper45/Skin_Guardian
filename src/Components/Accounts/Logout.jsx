import React, { useRef } from "react";

export default function Logout() {
  // const dropdownRef = useRef(null);
  const handleLogout = async () => {
    const refresh = localStorage.getItem("refresh");

    if (!refresh) {
      alert("No refresh token found");
      localStorage.clear();
      window.location.href = "/Login";

      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refresh }),
      });

      if (!response.ok) {
        toast.error("Unable to logout");
      } else {
        const data = await response.json();
        console.log(data);
        toast.success("Logout successful");
      }
    } catch (error) {
      console.log("Error:", error);
    }

    window.location.href = "/Login";
  };
  return (
    <div onClick={handleLogout} className=" flex  hover:bg-gray-100 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6 text-black mt-2 ml-2"
      >
        <path
          fill-rule="evenodd"
          d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
          clip-rule="evenodd"
        />
      </svg>

      <button className="block w-full text-left px-4 z-20 hover:cursor-pointer py-2 text-gray-700">
        Log Out
      </button>
    </div>
  );
}
