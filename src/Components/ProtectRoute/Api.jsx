<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
import axios from "axios";
import { ApiBaseUrl } from "../../utils/util";

const getToken = () => localStorage.getItem("userID");

const Api = axios.create({
  baseURL: ApiBaseUrl,
  headers: {
    authorization: `Bearer ${getToken()}`,
  },
});

<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
Api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Token expired or unauthorized. Redirecting to login...");
      localStorage.removeItem("userID");
<<<<<<< Updated upstream
      window.location.href = "/login";
=======
      window.location.href = "/login"; 
>>>>>>> Stashed changes
    }
    return Promise.reject(error);
  }
);

export default Api;
