import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Logout from "./Accounts/Logout";

const Navbar = () => {
  const [dropdown, setDropDown] = useState(false);
  const [buttonOption, setButtonOption] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    handleButtonOption();
  }, []);

  const dropdownHandler = () => {
    setDropDown((prevState) => !prevState);
  };

  const handleButtonOption = () => {
    if (localStorage.getItem("token")) {
      setButtonOption(false);
    } else {
      setButtonOption(true);
    }
  };

  const navigateAndCloseDropdown = (path) => {
    setDropDown(false);
    navigate(path);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex bg-[#5d6ae0d8]  justify-between">
        <div onClick={() => navigate("/")} className="flex">
          <img src={logo} className="h-7 w-7 m-2" alt="Logo" />
          <h1 className="font-bold text-base sm:text-2xl text-white m-1">
            Skin-Guardian
          </h1>
        </div>
        <div>
          <ul className="flex justify-between text-white">
            <li>
              <button
                className="m-1 p-1 cursor-pointer z-20"
                onClick={() => navigateAndCloseDropdown("/Product")}
              >
                Product
              </button>
            </li>
            <li>
              <button
                className="m-1 p-1 cursor-pointer z-20"
                onClick={() => navigateAndCloseDropdown("/Pricing")}
              >
                Pricing
              </button>
            </li>
            <li>
              <img
                onClick={dropdownHandler}
                className="border rounded-full border-white m-1 p-1 cursor-pointer z-20"
                width="36"
                height="36"
                src="https://img.icons8.com/fluency-systems-filled/48/ffffff/guest-male.png"
                alt="guest-male"
              />
            </li>
          </ul>
        </div>
      </div>
      {dropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-20 cursor-pointer">
          {buttonOption ? (
            <div ref={dropdownRef}>
              <button
                onClick={() => navigateAndCloseDropdown("/Login")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Log In
              </button>
              <button
                onClick={() => navigateAndCloseDropdown("/SignUp")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div ref={dropdownRef}>
              <Logout />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
