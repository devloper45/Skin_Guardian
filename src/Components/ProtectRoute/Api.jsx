import React from "react";
import axios from "axios";
import { ApiBaseUrl } from "../../utils/util";

const token = localStorage.getItem("userID");
console.log("token hello" + token);

const Api = axios.create({
  baseURL: ApiBaseUrl,
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export default Api;
