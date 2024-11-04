import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../../context/contextApi";
import GoogleAuth from "./GoogleAuth";
import MicrosoftAuth from "./MicrosoftAuth";
import OptionBG from "../../assets/bg.avif";
import { ApiBaseUrl } from "../../utils/util";

function Login() {
  // const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { userRole, setUserRole } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const LoginHandler = async () => {
    setIsLoading(true);
    try {
      const url = `${ApiBaseUrl}/user/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(inputValue),
      });

      if (!response.ok) {
        toast.error("Invalid Credentials.");
        setIsLoading(false);
      } else {
        const data = await response.json();
        console.log(data);
        console.log(data.data.token);
        const userID = data.data.token;
        localStorage.setItem("userID", userID);

        toast.success("User login successful");
        setIsLoading(false);
        navigate("/Dashboard");
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error:", error);
    }
  };

  function showPasswordHandler() {
    setShowPassword(true);
    setTimeout(() => {
      setShowPassword(false);
    }, 400);
  }

  return (
    <div className="flex flex-col justify-center bg-gray-50 min-h-screen">
      <div className="sm:container sm:mx-auto   ">
        <div className="absolute top-3 left-3">
          <div onClick={() => navigate("/")} className="flex cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
            <p className="text-White">Back to home</p>
          </div>
        </div>

       
        <div className="bg-gray-50   font-[sans-serif]">
          <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
            <div className="max-w-md w-full">
              <div className="p-8 rounded-2xl  bg-white shadow-2xl">
                <h2 className="text-gray-800 text-center text-2xl font-bold">
                  Sign in
                </h2>
                <form
                  className="mt-8 space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Email
                    </label>
                    <div className="relative flex items-center">
                      <input
                        name="email"
                        type="email"
                        required
                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                        placeholder="Enter user Email"
                        onChange={onChangeHandler}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-4 h-4 absolute right-4"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="10"
                          cy="7"
                          r="6"
                          data-original="#000000"
                        ></circle>
                        <path
                          d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                        placeholder="Enter password"
                        onChange={onChangeHandler}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-4 h-4 absolute right-4 cursor-pointer"
                        viewBox="0 0 128 128"
                        onClick={showPasswordHandler}
                      >
                        <path
                          d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        for="remember-me"
                        className="ml-3 block text-sm text-gray-800"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a
                        // href="jajvascript:void(0);"
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <div className="!mt-8">
                    <button
                      type="button"
                      className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                      onClick={LoginHandler}
                    >
                      {isLoading ? (
                        <div className="flex justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="animate-spin  h-5 w-5 mr-3"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                              clip-rule="evenodd"
                            />
                          </svg>

                          <p className="  ">Loading ...</p>
                        </div>
                      ) : (
                        "Sign in"
                      )}
                    </button>
                  </div>
                  <p className="text-gray-800 text-sm !mt-8 text-center">
                    Don't have an account?{" "}
                    <a
                      href="/Signup"
                      className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                    >
                      Register here
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
