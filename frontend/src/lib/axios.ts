import axios from "axios";

const isDelevelopmentMode = process.env.NEXT_PUBLIC_NODE_ENV === "development";

const baseURL = isDelevelopmentMode
  ? "http://localhost:3333/api/v1"
  : process.env.NEXT_PUBLIC_BASE_URL;

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
export { baseURL };
