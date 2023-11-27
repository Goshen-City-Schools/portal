/* FFES */

import axios from "./axios";

export const getFees = async () => {
  try {
    const response = await axios.get(`/api/v1/fees`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to fetch school classes data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const getFee = async (route) => {
  try {
    const response = await axios.get(`/api/v1/fees/${route}`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error(`Failed to fetch ${route} fees data:`, error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const createFee = async (route, tuitionData) => {
  try {
    const response = await axios.post(`/api/v1/fees/${route}`, tuitionData);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error(`Failed to add ${route} data:`, error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const updateFee = async (route, tuitionData) => {
  try {
    const response = await axios.put(`/api/v1/fees/${route}`, tuitionData);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error(`Failed to add ${route} data:`, error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const deleteFee = async (route, feeId) => {
  try {
    const response = await axios.delete(`/api/v1/fees/${route}/${feeId}`);
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
    const response = await axios.get(`/api/v1/fees`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to fetch school classes data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const deleteFeeType = async () => {
  try {
    const response = await axios.get(`/api/v1/fees`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to fetch school classes data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const updateFeeType = async () => {
  try {
    const response = await axios.get(`/api/v1/fees`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to fetch school classes data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const updateSubClass = async () => {
  try {
    const response = await axios.get(`/api/v1/fees`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to fetch school classes data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};
