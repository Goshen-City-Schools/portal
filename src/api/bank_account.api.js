import axios from "./axios";

export const getbankAccounts = async () => {
  try {
    const response = await axios.get(`/api/v1/bank_accounts`);
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to fetch bank accounts data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const getbankAccount = async (bank_account_id) => {
  try {
    const response = await axios.get(
      `/api/v1/bank_accounts/${bank_account_id}`
    );
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to fetch bank accounts data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const updateBankAccount = async (bank_account_id) => {
  try {
    const response = await axios.patch(
      `/api/v1/bank_accounts/${bank_account_id}`
    );
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to update bank account data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const deleteBankAccount = async (bank_account_id) => {
  try {
    const response = await axios.delete(
      `/api/v1/bank_accounts/${bank_account_id}`
    );
    return response.data; // Assuming the response is expected to be JSON
  } catch (error) {
    console.error("Failed to delete bank account:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};
