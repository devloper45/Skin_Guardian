import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Forgotpassword() {
  const [error, setError] = useState({});
  const [inputValue, setInputValue] = useState({
    email: "",
  });
  const navigate = useNavigate();

  function validation(values) {
    let errors = {};

    // Email validation
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    return errors;
  }

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const validationErrors = validation(inputValue);
    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("http://127.0.0.1:8000/password-reset/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputValue),
        });

        if (!response.ok) {
          throw new Error("Failed to send reset email");
        }

        toast.success("Email sent! Please check your inbox.");
        navigate("/login");
      } catch (error) {
        toast.error("Error sending email. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="sm:container flex flex-col sm:mx-auto mx-8 my-auto">
        <div>
          <h1 className="text-center font-semibold text-[24px] text-White -mt-5">
            Your Finance Assistant
          </h1>
        </div>
        <div className="card">
          <h1 className="text-center md:text-[28px] text-[22px] font-medium text-White pt-1">
            Forgot Password
          </h1>
          <p className="tag-line">
            Enter your email and we will send a link to reset your password
          </p>
          <div>
            <form onSubmit={submitHandler}>
              <input
                className="input"
                type="email"
                placeholder="Email"
                name="email"
                value={inputValue.email}
                onChange={onChangeHandler}
              />
              {error.email && <p className="error">{error.email}</p>}

              <button className="btn" disabled={inputValue.email === ""}>
                Send
              </button>

              <div className="flex items-center justify-center py-2 tag-line">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-left mr-2"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                  />
                </svg>
                <Link to="/login">Back to login</Link>
              </div>
            </form>
          </div>
        </div>
        <div className="shadowb absolute bottom-7 right-0 h-72 w-[800px] "></div>
        <p className="tag-line2 text-white my-2">
          <span className="text-white"> By signing in, you agree to our</span>
          &nbsp;
          <span className="text-[#75A48C]">
            Terms of Service <span className="text-white">and </span>Privacy
            Policy.
          </span>
        </p>
      </div>
    </div>
  );
}

export default Forgotpassword;

// import { useEffect, useState, useRef } from "react";

// import validation from "../Validiation";
// import { Link, useNavigate } from "react-router-dom";

// function Forgotpassword() {
//   // const [otp, setOtp] = useState("");
//   const [error, setError] = useState({});
//   const [inpuValue, setInputValue] = useState({
//     email: "",
//   });
//   const form = useRef();
//   const navigate = useNavigate();
//   // onChangeHandler....
//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setInputValue({ ...inpuValue, [name]: value });
//     console.log(inpuValue);
//   };
//   // submitHandler.....
//   const submitHandler = async (event) => {
//     event.preventDefault();
//     setError(validation(inpuValue));
//     try {
//       const response = await fetch("http://localhost:8000/reset-password/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(inputValue),
//       });
//       if (!response.ok) {
//         console.log("error in resetting password");
//         toast.error(" try again ");
//       } else {
//       }
//     } catch (error) {}
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="sm:container flex flex-col sm:mx-auto mx-8 my-auto ">
//         <div>
//           <h1 className="text-center font-semibold text-[24px] text-White -mt-5 ">
//             Your Finance Assistant
//           </h1>
//         </div>
//         <div className="card">
//           <h1 className="text-center md:text-[28px]  text-[22px] font-medium text-White pt-1">
//             Forgot Password
//           </h1>
//           <p className="tag-line">
//             Enter your email and we will send Link to reset Password
//           </p>

//           <div>
//             <form onSubmit={submitHandler} ref={form}>
//               <input
//                 className="input"
//                 type="email"
//                 placeholder="Email"
//                 name="email"
//                 onChange={onChangeHandler}
//               />
//               {error.email && <p className="error">{error.email}</p>}

//               <button
//                 className="btn"
//                 disabled={inpuValue.email === ""}
//                 // onClick={generateOTP}
//               >
//                 Send
//               </button>

//               <div className="flex items-center justify-center py-2 tag-line">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   fill="currentColor"
//                   className="bi bi-arrow-left mr-2"
//                   viewBox="0 0 16 16"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
//                   />
//                 </svg>
//                 <Link to="/login">Back to login</Link>
//               </div>
//             </form>
//           </div>
//         </div>
//         <div className="shadowb absolute bottom-7 right-0 h-72 w-[800px] "></div>
//         <p className="tag-line2 text-white my-2">
//           <span className="text-white"> By signing in, you agree to our</span>{" "}
//           &nbsp;
//           <span className="text-[#75A48C]">
//             Terms of Service <span className="text-white">and </span>Privacy
//             Policy.
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Forgotpassword;
