import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:3333",
});

export default api;