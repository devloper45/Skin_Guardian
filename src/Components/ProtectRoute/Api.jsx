import React from "react";
import axios from "axios";

const Api = axios.create({
  baseURL: "https://fyp-backend.adaptable.app/v1/api",
});

export default Api;
