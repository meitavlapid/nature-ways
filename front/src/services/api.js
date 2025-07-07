import axios from "axios";

const api = axios.create({
  baseURL: "https://back-nature-ways.onrender.com", // כתובת הבקאנד שלך ב-Render
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
