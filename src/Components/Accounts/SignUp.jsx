import React, { useState } from "react";
import validation from "../Validiation"; // Import your validation function
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import OptionBG from "../../assets/bg.avif";

function SignUp() {
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState({
    firstName:"",
    lastName:"",
    email: "",
    password: "",
    confirmPassword:"",
    
  });

  const navigate = useNavigate();

  // OnChangeHandler
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };


  const handlefreeSignup = async (event) => {
    event.preventDefault();
    // const validationErrors = validation(inputValue); // Validate form data
    // setError(validationErrors.length===0);

    // if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("https://fyp-backend.adaptable.app/v1/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputValue),
        });

        if (!response.ok) {
          throw new Error("Sign-up request failed");
        }

        const result = await response.json();
        console.log("Sign-up successful:", result);

       
          // toast("Check your email for confirmation.");
        

        navigate("/Login"); // Redirect to login page after successful signup
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while signing up.");
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
      <div className="sm:container sm:mx-auto mx-auto">
       
        <div className="card py-5 px-5">
          <h1 className="text-center md:text-[28px] text-[22px] font-medium text-White pt-1">
            Sign Up
          </h1>
          <p className="tag-line"> Your AI-Guide to Skin Wellness</p>
          <div className="mx-4">
            <form onSubmit={handlefreeSignup}>
            <div className=" flex ">
            <input
                className="input mr-1"
                type="text"
                placeholder="First Name"
                name="firstName"
                value={inputValue.firstName}
                onChange={onChangeHandler}
              />
                <input
                className="input"
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={inputValue.lastName}
                onChange={onChangeHandler}
              />
              {error.firstname && <p className="error">{error.firstname}</p>}
                  
                  </div>

              <input
                className="input"
                type="email"
                placeholder="Email"
                name="email"
                value={inputValue.email}
                onChange={onChangeHandler}
              />
              
              {error.email && <p className="error">{error.email}</p>}

              <div className=" flex  bg-white rounded-xl my-2 ">
                
                <input
                  className=" bg-white rounded-xl  p-1 w-full sm:p-2 outline-none text-black"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={inputValue.password}
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
              <div className=" flex  bg-white rounded-xl my-2 ">
                <input
                  className=" bg-white rounded-xl  p-1 w-full sm:p-2 outline-none text-black"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={inputValue.confirmPassword}
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
              {error.password && <p className="error">{error.password}</p>}
              <button type="submit" className="btn">
                Sign Up for free
              </button>
              <button
                
                
                className="btn"
              >
                Sign Up As Docter
              </button>
            </form>
            <p className="tag-line">
              Already have an account?
              <Link to="/Login">
                <span className="text-White hover:underline"> Login</span>
              </Link>
            </p>
          </div>
        </div>
       
      </div>
    </div>
  );
}

export default SignUp;
