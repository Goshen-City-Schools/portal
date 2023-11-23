import axios from "./axios";

export const getStudentsData = async () => {
  try {
    const response = await axios.get(`/api/v1/students`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to fetch staff data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const registerStudent = async (studentData) => {
  try {
    const response = await axios.post(
      "/api/v1/auth/register",
      JSON.stringify(studentData),
      {
        headers: { "Content-Type": "application/json", withCredentials: true },
      }
    );
    return response.data; // Assuming your API returns data upon successful registration
  } catch (error) {
    // Handle error
    console.error("Error registering student:", error.message);
    throw error; // You might want to handle the error in the component using this API
  }
};

export const getSingleStudent = async (portalId) => {
  try {
    const response = await axios.get(`/api/v1/students/${portalId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching single student:", error.message);
    throw error;
  }
};

export const deleteStudent = async (portalId) => {
  try {
    const response = await axios.delete(`/api/v1/students/${portalId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching single staff:", error.message);
    return null; // Return a default value or handle the error appropriately
  }
};
