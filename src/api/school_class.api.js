import axios from "./axios";

export const getSchoolClasses = async () => {
  try {
    const response = await axios.get(`/api/v1/schoolClasses`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to fetch school classes data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const createSubClass = async (formData) => {
  try {
    const response = await axios.post(`/api/v1/schoolClasses/new`, formData);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to create school classes data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const deleteSubClass = async () => {
  try {
    const response = await axios.get(`/api/v1/schoolClasses`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to fetch school classes data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const updateSubClass = async () => {
  try {
    const response = await axios.get(`/api/v1/schoolClasses`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to fetch school classes data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};
