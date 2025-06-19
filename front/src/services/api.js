import axios from "axios";

// הגדרה אחת של כתובת השרת (אפשר גם לפי סביבה)
const api = axios.create({
  baseURL: "https://back-nature-ways.onrender.com", // החלף לכתובת שלך
});

export default api;
