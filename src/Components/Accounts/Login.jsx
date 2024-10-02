import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../../context/contextApi";
import GoogleAuth from "./GoogleAuth";
import MicrosoftAuth from "./MicrosoftAuth";
import OptionBG from "../../assets/bg.avif";

function Login() {
  // const [user, setUser] = useState({});
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
    try {
      const response = await fetch(
        "https://fyp-production-c71f.up.railway.app/v1/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(inputValue),
        }
      );

      if (!response.ok) {
        toast.error("Invalid Credentials.");
      } else {
        const data = await response.json();
        console.log(data);
        console.log(data.data.token);
        const userID = data.data.token;
        localStorage.setItem("userID", userID);

        toast.success("User login successful");
        navigate("/Dashboard");
      }
    } catch (error) {
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
    <div
      className="flex flex-col justify-center bg-center bg-cover bg-no-repeat min-h-screen"
      style={{
        backgroundImage: `url(${OptionBG})`,
      }}
    >
      <div className="sm:container sm:mx-auto text-white my-24">
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

        <div className="card">
          <h1 className="text-center md:text-[28px] text-[22px] font-medium text-White pt-1">
            Welcome Back !!
          </h1>
          <p className="tag-line">Login To Continue </p>
          <div className=" grid sm:grid-cols-2  grid-cols-1 gap-5">
            <GoogleAuth />

            <MicrosoftAuth />
          </div>
          <hr className=" w-1/2 mx-auto my-3" />
          <div>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                className="input"
                type="email"
                placeholder="Enter your Email"
                name="email"
                onChange={onChangeHandler}
              />
              <div className=" flex  bg-white rounded-xl my-2 ">
                <input
                  className=" bg-white rounded-xl  p-1 w-full sm:p-2 outline-none text-black"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  onChange={onChangeHandler}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 text-black cursor-pointer h-full mt-2 mr-2 "
                  onClick={showPasswordHandler}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </div>

              <button className="btn  " onClick={LoginHandler}>
                Login
              </button>
            </form>
            <p className="tag-line">
              Don't have an account?
              <Link to="/SignUp">
                <span className="text-white hover:underline hover:text-blue-600">
                  {" "}
                  Sign up.
                </span>
              </Link>
            </p>
            <p className="tag-line">
              <Link to="/forgot-password">
                <span className="text-white underline hover:text-blue-600 ">
                  {" "}
                  Forget Password.
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
