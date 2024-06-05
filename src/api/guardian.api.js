import axios from "./axios";

export const registerGuardian = async (guardianData) => {
  try {
    const response = await axios.post(
      "/api/v1/guardians",
      JSON.stringify(guardianData),
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
    console.error("Error registering guardian:", error.message);
    throw error; // You might want to handle the error in the component using this API
  }
};
