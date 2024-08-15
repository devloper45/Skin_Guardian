import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/contextApi";

function Auth({ children }) {
  const { userRole } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userRole !== undefined) {
      setLoading(false);
    }
  }, [userRole]);

  if (loading) {
    return <div>Loading...</div>; // or a spinner, or nothing
  }

  if (userRole !== false) {
    toast.error("Only Premium Member can access Premium Features");
    localStorage.clear();
    return <Navigate to="/Login" />;
  }

  return children;
}

export default Auth;
