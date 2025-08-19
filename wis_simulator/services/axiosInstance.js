import axios from "axios";

const api = axios.create({
  //base url
  // baseURL: "http://10.254.33.34:5125/api",
  baseURL: "https://wisapi-latest.onrender.com/api",

  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
