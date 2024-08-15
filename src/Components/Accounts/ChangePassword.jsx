import { useState } from "react";

import validation from "../Validiation";
// import { Link } from "react-router-dom";

import React from "react";

export default function ChangePassword() {
  const [error, setError] = useState({});
  const [inpuValue, setInputValue] = useState({
    password: "",
    reaptpassword: "",
  });

  // onChangeHandler....
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inpuValue, [name]: value });
    console.log(inpuValue);
  };
  // submitHandler.....
  const submitHandler = (event) => {
    event.preventDefault();
    setError(validation(inpuValue));
  };
  return (
    <div className="sm:container sm:mx-auto mx-8  ">
      <div>
        <h1 className="text-center font-semibold text-[24px] text-InputColor -mt-5 ">
          Your Finance Assistance
        </h1>
      </div>
      <div className="card">
        <h1 className="text-center md:text-[28px]  text-[22px] font-medium text-White pt-1">
          Reset Password
        </h1>
        <div>
          <form onSubmit={submitHandler}>
            <input
              className="input "
              type="password"
              placeholder="New Password"
              name="password"
              onChange={onChangeHandler}
            />
            {error.password && <p className="error">{error.password}</p>}
            <input
              className="input "
              type="password"
              placeholder="Confirm Password"
              name="reaptpassword"
              onChange={onChangeHandler}
            />
            {error.reaptpassword && (
              <p className="error">{error.reaptpassword}</p>
            )}
            <button className="btn">Reset</button>
          </form>
        </div>
      </div>
      <div className="shadowb absolute bottom-7 right-0 h-72 w-[800px] "></div>
      <p className="tag-line2 text-white my-2">
        <span className="text-white"> By signing in, you agree to our</span>{" "}
        &nbsp;
        <span className="text-[#75A48C]">
          Terms of Service <span className="text-white">and </span>Privacy
          Policy.
        </span>
      </p>
    </div>
  );
}
