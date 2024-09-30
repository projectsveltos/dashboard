import axios from "axios";

const client = axios.create({
  baseURL: "/api",
  timeout: import.meta.env.VITE_API_TIMEOUT,
});

client.interceptors.request.use(function (config) {
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default client;
