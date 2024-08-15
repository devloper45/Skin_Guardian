import React, { useContext } from "react";
import { UserProvider } from "../../context/contextApi";

export default function MicrosoftAuth() {
  // const [userRole]= useContext(UserProvider)
  return (
    <div className="sign-in-tag cursor-pointer">
      <p>Sign-up With Microsoft</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-microsoft text-[#3e5c4d]"
        viewBox="0 0 16 16"
      >
        <path d="M7.462 0H0v7.19h7.462zM16 0H8.538v7.19H16zM7.462 8.211H0V16h7.462zm8.538 0H8.538V16H16z" />
      </svg>
    </div>
  );
}
