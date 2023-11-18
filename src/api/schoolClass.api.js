export const getSchoolClassesData = async () => {
  try {
    const response = await axios.get(`/api/v1/schoolClasses`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to fetch school classes data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};
