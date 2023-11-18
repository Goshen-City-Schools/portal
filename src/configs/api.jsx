// api.js

const API_BASE_URL = import.meta.env.PROD
  ? "https://gshcs-api.onrender.com/api/v1"
  : "http://localhost:5000/api/v1";

const API_ENDPOINTS = {
  CLASSES: "/classes",
  CLASS_DETAILS: "/classes/:class",
  STUDENTS: "/students",
  LOGIN: "/auth/login",
};

export { API_BASE_URL, API_ENDPOINTS };
