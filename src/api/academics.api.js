import axios from "./axios";

export const getAcademicSessisons = async () => {
  try {
    const response = await axios.get(`/api/v1/academics/sessions`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to academic sessions data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};
