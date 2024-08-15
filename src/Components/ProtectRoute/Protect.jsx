import React from "react";

import { Navigate } from "react-router-dom";

function Protect({ children }) {
  if (localStorage.getItem("refresh")) {
    return children;
  } else {
    return <Navigate to="/Login" />;
  }
}

export default Protect;
