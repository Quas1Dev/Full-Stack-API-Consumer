import axios, { AxiosInstance } from 'axios';

console.log("Server: ", import.meta.env.VITE_API_BASE_URL);

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3333",
});

export default api;