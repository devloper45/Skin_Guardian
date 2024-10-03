import React from "react";
import axios from "axios";

const token = localStorage.getItem("userID");
console.log("token" + token);

const Api = axios.create({
  baseURL: "https://fyp-production-c71f.up.railway.app/v1/api",
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export default Api;
