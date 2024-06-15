import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  timeout: 1000,
  headers: { "X-Custom-Header": "footbar" },
});

export default axiosInstance;
