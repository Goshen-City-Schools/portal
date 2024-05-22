import axios from "./axios";

export const getAcademicSessions = async () => {
  try {
    const response = await axios.get(`/api/v1/academics/session`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to academic sessions data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const getAcademicTerms = async () => {
  try {
    const response = await axios.get(`/api/v1/academics/term`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to academic sessions data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};
