import React, { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../../context/contextApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function GoogleAuth() {
  const [googleSignInClicked, setGoogleSignInClicked] = useState(false);
  const [user, setUser] = useState({});
  const { userRole, setUserRole } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleCallbackResponse(response) {
    // console.log(response.data.access_token);
    const idToken = response.credential;
    console.log("Encoded Jwt ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);

    console.log(userObject);
    setUser(userObject);

    try {
      const response = await fetch("http://127.0.0.1:8000/signup_google/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_token: idToken }),
      });
      console.log(response.json);

      if (!response.ok) {
        toast.error("try again ...");
      } else {
        const data = await response.json();
        const { refresh, access, token, unique_id, is_free, user_id } = data;
        console.log("dataaa " + data);

        localStorage.setItem("token", token);
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        // localStorage.setItem("username", inputValue.email);
        localStorage.setItem("userRole", is_free);
        localStorage.setItem("stripeid", user_id);

        console.log(is_free);
        setUserRole(is_free);
        console.log("user role in after setting " + userRole);

        let newuserId = unique_id.toLowerCase();
        localStorage.setItem("userId", newuserId);
        toast.success("User login successful");
        navigate("/Dashboard");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  useEffect(() => {
    if (googleSignInClicked) {
      google.accounts.id.initialize({
        client_id:
          "112947922003-nejpiqa2pgdsn116f7j0gb1csjollbv0.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });
      google.accounts.id.renderButton(document.getElementById("googleSignUp"));
      google.accounts.id.prompt();
    }
  }, [googleSignInClicked]); // Depend on googleSignInClicked

  console.log(user);

  return (
    <div
      className="sign-in-tag hover:cursor-pointer"
      id="googleSignUp"
      onClick={() => setGoogleSignInClicked(true)} // Update state on click
    >
      <p className=" text-[#476d59]">Sign-up With Google</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-google text-[#609178]"
        viewBox="0 0 16 16"
      >
        <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
      </svg>
    </div>
  );
}
