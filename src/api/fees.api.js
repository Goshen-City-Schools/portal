/* FFES */

import axios from "./axios";

export const getFees = async () => {
  try {
    const response = await axios.get(`/api/v1/schoolClasses`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to fetch school classes data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const getFee = async () => {
  try {
    const response = await axios.get(`/api/v1/schoolClasses`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to fetch school classes data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const createFee = async () => {
  try {
    const response = await axios.post(`/api/v1/schoolClasses`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to add tuition data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const updateFee = async () => {
  try {
    const response = await axios.get(`/api/v1/schoolClasses`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to fetch school classes data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const deleteFee = async () => {
  try {
    const response = await axios.get(`/api/v1/schoolClasses`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to fetch school classes data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

/* FEES TYPES */

export const getFeesTypes = async () => {
  try {
    const response = await axios.get(`/api/v1/fees`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to fetch school classes data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const createFeeType = async () => {
  try {
    const response = await axios.get(`/api/v1/schoolClasses`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to fetch school classes data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const deleteFeeType = async () => {
  try {
    const response = await axios.get(`/api/v1/schoolClasses`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to fetch school classes data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const updateFeeType = async () => {
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
