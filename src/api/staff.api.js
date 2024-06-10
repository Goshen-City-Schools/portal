import axios from "./axios";

export const getStaffData = async () => {
  try {
    const response = await axios.get(`/api/v1/staff`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to fetch staff data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const registerStaff = async (staffData) => {
  try {
    const response = await axios.post(
      "/api/v1/auth/register",
      JSON.stringify(staffData),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log(response);
    return response.data; // Assuming your API returns data upon successful registration
  } catch (error) {
    // Handle error
    console.error("Error registering student:", error.message);
    throw error; // You might want to handle the error in the component using this API
  }
};

export const getSingleStaff = async (portalId) => {
  try {
    const { data } = await axios.get(`/api/v1/staff/${portalId}`);
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching single staff:", error.message);
    return null; // Return a default value or handle the error appropriately
  }
};

export const deleteStaff = async (portalId) => {
  try {
    const response = await axios.delete(`/api/v1/staff/${portalId}`);

    return response;
  } catch (error) {
    console.error("Error fetching single staff:", error.message);
    return null; // Return a default value or handle the error appropriately
  }
};

export const updateStaff = async (portalId) => {
  try {
    const response = await axios.delete(`/api/v1/staff/${portalId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching single staff:", error.message);
    return null; // Return a default value or handle the error appropriately
  }
};
