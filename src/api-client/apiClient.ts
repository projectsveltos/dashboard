import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_SVELTOS_API_BASE_URL,
  timeout: 1000,
});
