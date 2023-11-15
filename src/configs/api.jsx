// api.js

const API_BASE_URL = "http://localhost:5000/api/v1";

const API_ENDPOINTS = {
  CLASSES: "/classes",
  CLASS_DETAILS: "/classes/:class",
  STUDENTS: "/students",
  LOGIN: "/auth/login",
};

export { API_BASE_URL, API_ENDPOINTS };
