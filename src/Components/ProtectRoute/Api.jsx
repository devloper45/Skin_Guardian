import React from "react";
import axios from "axios";

const token = localStorage.getItem("userID");

const Api = axios.create({
  
  baseURL: "https://fyp-backend.adaptable.app/v1/api",
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export default Api;
