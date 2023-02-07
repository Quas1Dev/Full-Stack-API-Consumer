import axios, { AxiosInstance } from 'axios';

console.log(process.env.API_BASE_URL);

const api: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:3333",
});

export default api;