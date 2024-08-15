import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Bars3Icon,
  LockClosedIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import Logo from "../assets/logo.png";
import { UserContext } from "../context/contextApi";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import Logout from "./Accounts/Logout";

export default function SideBarrr({ openBar, setOpenBar }) {
  const [dropdown, setDropDown] = useState(false);
  const navigate = useNavigate();
  const { userRole } = useContext(UserContext);
  const location = useLocation();
  const logoutRef = useRef(null);
  console.log("user role in sidebarr " + userRole);
  const NavBarData = [
    {
      name: "Take Photo",
      stateKey: "TakePhoto",
      path: "",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      ),
    },
    {
      name: "Skin Doctor",
      path: userRole === true ? "" : "/CustomReportTemplate",
      stateKey: "ReportTemplate",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
    },
    {
      name: "Custom Report",
      stateKey: "CustomReport",
      path: "/CustomReport",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
          />
        </svg>
      ),
    },
    {
      name: "Upload Photo",
      stateKey: "UploadFileTemplate",
      path: "/fileTemplates",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
          />
        </svg>
      ),
    },
  ];

  // const handleLogout = async () => {
  //   const refresh = localStorage.getItem("refresh");

  //   if (!refresh) {
  //     alert("No refresh token found");
  //     return;
  //   }

  //   localStorage.clear();

  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/logout/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ refresh_token: refresh }),
  //     });

  //     if (!response.ok) {
  //       alert("Unable to logout");
  //     } else {
  //       const data = await response.json();
  //       console.log(data);
  //       toast.success("Logout successful");
  //     }
  //   } catch (error) {
  //     console.log("Error:", error);
  //   }

  //   window.location.href = "/Login";
  // };

  const handleNavClick = (path) => {
    console.log(userRole);
    console.log("Checking the condition here ", path);
    if (path === "" && userRole) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="mt-1 text-sm text-gray-500">
                  Upgrade to Premium to avail this feature
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-800 hover:text-InputColor focus:outline-none focus:ring-2 focus:ring-InputColor"
            >
              Close
            </button>
          </div>
        </div>
      ));
    } else {
      navigate(path);
    }
  };

  const handleDropup = () => {
    setDropDown((prevState) => !prevState);
  };
  const isActive = (path) => location.pathname === path;
  const handleClickOutside = (event) => {
    if (logoutRef.current && !logoutRef.current.contains(event.target)) {
      setDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handlePremium() {
    const stripeid = localStorage.getItem("stripeid");
    try {
      const premiumResponse = await fetch(
        `http://127.0.0.1:8000/stripe-checkout/${stripeid}/`,
        {
          method: "GET",
        }
      );

      if (!premiumResponse.ok) {
        throw new Error("Premium subscription request failed");
      } else {
        // localStorage.setItem("userRole", false);
      }
      console.log(premiumResponse);

      const result2 = await premiumResponse.json();

      if (!result2?.url) {
        // alert("Error in stripe checkout");
        toast.error("Error in stripe checkout");
      }

      console.log("Premium subscription successful:", result2);
      alert("Check your email for confirmation and premium benefits.");
      window.location = result2.url;
      localStorage.clear();
      navigate("/Login");
    } catch (error) {
      console.error("Error with premium subscription:", error);
      alert("An error occurred with premium subscription.");
    }
  }

  return (
    <>
      <div className="fixed z-10">
        <div className="flex">
          <div className="h-[100vh] bg-[#050706] flex flex-col rounded-r-lg justify-between text-white p-2">
            {openBar ? (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  onClick={() => setOpenBar((prev) => !prev)}
                  className="h-7"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            ) : (
              <div>
                <Bars3Icon
                  onClick={() => setOpenBar((prev) => !prev)}
                  className="h-7"
                />
              </div>
            )}
            <div>
              <UserCircleIcon
                onClick={handleDropup}
                className="h-7 text-white cursor-pointer"
              />
            </div>
            {dropdown && (
              <div
                ref={logoutRef}
                className="absolute bottom-10 left-2 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg cursor-pointer"
              >
                {/* <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 z-20 hover:cursor-pointer py-2 text-gray-700 hover:bg-gray-100"
                >
                  Log Out
                </button> */}
                <Logout />
                {userRole === true && (
                  <button
                    onClick={handlePremium}
                    className="block w-full text-left px-4 z-20 hover:cursor-pointer py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Premium
                  </button>
                )}
                <button
                  // onClick={}
                  className="block w-full text-left px-4 z-20 hover:cursor-pointer py-2 text-gray-700 hover:bg-gray-100"
                >
                  Change Password
                </button>
              </div>
            )}
          </div>

          {openBar && (
            <div>
              <div className="h-[100vh] md:w-[11rem] bg-[#213129] rounded-r-2xl text-white p-4">
                <div
                  onClick={() => navigate("/Dashboard")}
                  className=" cursor-pointer flex bg-[#213129] bg-opacity-40 shadow-xl px-2 pr-4 rounded-full"
                >
                  <img src={Logo} alt="" className="my-2 mx-1 h-8 w-8" />
                  <h2 className="text-xl  font-bold my-2">Skin-Guardian</h2>
                </div>
                <ul className="space-y-2 my-4">
                  {NavBarData.map(({ name, stateKey, icon, path }) => (
                    <li
                      key={stateKey}
                      onClick={() => handleNavClick(path)}
                      className={`p-1 my-1 rounded-2xl cursor-pointer hover:border hover:border-white  ${
                        isActive(path) ? "bg-[#75A48C] text-white" : ""
                      } `}
                    >
                      <button
                        // className={` ${showStates[stateKey] ? 'text-center' : 'hover:text-center'}`}
                        type="button"
                      >
                        <div className="flex mt-1 hover:border-white ">
                          <div className="bg-[#75A48C] rounded-full p-1">
                            {icon}
                          </div>
                          <span className="mx-1 text-[10px] my-0 p-1">
                            {name}
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
