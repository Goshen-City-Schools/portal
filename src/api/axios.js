import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.PROD
    ? "https://gshcs-api.onrender.com"
    : "http://localhost:5000",
});
