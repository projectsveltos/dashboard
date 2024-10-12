import axios from "axios";

const client = axios.create({
  baseURL: "/api",
  timeout: import.meta.env.VITE_API_TIMEOUT,
});

client.interceptors.request.use(function (config) {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default client;
