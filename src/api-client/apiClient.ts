import axios from "axios";
import { toast } from "sonner";

const client = axios.create({
  baseURL: "/api",
  timeout: import.meta.env.VITE_API_TIMEOUT,
});

client.interceptors.request.use(function (config) {
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default client;
