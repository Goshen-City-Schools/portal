import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.PROD
    ? "https://gshcs-api.onrender.com/api/v1/classes"
    : '"http://localhost:5000"',
});
