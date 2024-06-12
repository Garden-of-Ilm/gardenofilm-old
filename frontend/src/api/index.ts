import axios from "axios";

const isDelevelopmentMode = process.env.NODE_ENV === "development";

const baseURL = isDelevelopmentMode
    ? "http://localhost:3333/api/v1"
    : "https://fatwa-backend.vercel.app/api/v1";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use((req) => {
  if (localStorage.getItem("accessToken")) {
    const accessToken = JSON.parse(localStorage.getItem("accessToken") ?? "");
    req.headers.Authorization = `Bearer ${accessToken}`;
  }

  return req;
});

export default axiosInstance;
