import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  useToast,
  Flex,
  Switch,
  Text,
} from "@chakra-ui/react";
import { createFee } from "../../../api/fees.api";

import CustomSelect from "../../shared/Select.component";

import { useModal } from "../../../app/contexts/ModalContext";
import { useFees } from "../../../hooks";

export default function BoardingFeeForm({ action, feeTypeId, existingData }) {
  const toast = useToast();
  const { closePortal } = useModal();
  const { fees } = useFees("boarding");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    gender: existingData?.gender,
    price: existingData?.price || null,
    status: true,
  });

  const [successTimeout, setSuccessTimeout] = useState(null);
  const [redirectTimeout, setRedirectTimeout] = useState(null);

  useEffect(() => {
    if (action === "edit" && feeTypeId) {
      // Fetch existing data for the selected class and set it as the initial form data
      const existingData = fees.find((fee) => fee._id === feeTypeId);

      // Logging data for debugging
      console.log(fees, existingData);

      if (existingData) {
        setFormData({
          gender: existingData?.gender,
          price: existingData?.price,
          status: existingData?.status,
        });
      }
    }
  }, [action, feeTypeId, fees]);

  // Useeffect to cleanup timeouts when the component unmounts
  useEffect(() => {
    return () => {
      clearTimeout(successTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [successTimeout, redirectTimeout]);

  const showToast = (options) => {
    const toastId = toast(options);
    return toastId;
  };

  function handleFormChange(e) {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    const { gender, price, status } = formData;

    if (!gender || !price) {
      const toastId = toast({
        title: "All fields are required!",
        status: "error",
        position: "top-right",
        duration: null,
        isClosable: true,
      });

      setTimeout(() => {
        toast.close(toastId);
      }, 1000);

      return;
    }

    setIsLoading(true);

    const boardingFeeData = {
      gender: gender,
      type: "boarding",
      price: parseInt(price, 10),
      status: status,
    };

    try {
      const response = await createFee(boardingFeeData.type, boardingFeeData);

      setIsLoading(false);

      setFormData({
        gender: "",
        price: "",
        status: false,
      });

      closePortal();

      const successToastId = showToast({
        title: `Boarding Fee for ${gender} students created successfully!`,
        status: "success",
        duration: 2000,
        position: "top-right",
      });

      setSuccessTimeout(successToastId);

      const redirectTimeoutId = setTimeout(() => {
        navigate("/admin/finance/fees");
      }, 1000);

      setRedirectTimeout(redirectTimeoutId);
    } catch (error) {
      console.error("Error creating boarding fee:", error.message);

      setIsLoading(false);

      showToast({
        title: "Failed to create boarding fee",
        description: error.message || "An unexpected error occurred",
        status: "error",
        duration: 5000,
        position: "top-right",
      });
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-6 px-2">
      {/* Fee name */}
      <FormControl>
        <FormLabel fontSize="sm" fontWeight="bold">
          Gender
        </FormLabel>
        <CustomSelect
          name="gender"
          value={formData?.gender}
          onChange={handleFormChange}
          disabled={action === "edit"} // Disable selection if in edit mode
        >
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
        </CustomSelect>
      </FormControl>

      {/* Select Account Type fee is for */}
      <FormControl>
        <FormLabel fontSize="sm" fontWeight="bold">
          Hostel Fee
        </FormLabel>
        <Input
          name="price"
          fontSize="sm"
          type="number"
          pattern="[0-9]*"
          autoComplete="off"
          onChange={handleFormChange}
          value={formData.price}
          placeholder="Hostel fee"
        />
      </FormControl>

      {/* Boarding Fee Status */}
      <Flex mt={2} justifyContent="space-between" alignItems="center">
        <Text as="p" fontSize="sm" fontWeight="bold">
          Fee Status
        </Text>
        <Switch
          name="status"
          isChecked={formData.status}
          onChange={handleFormChange}
        />
      </Flex>

      {/* Submit request button */}
      <Button
        my={4}
        fontSize="sm"
        colorScheme="green"
        width="max-content"
        mx="auto"
        type="submit"
        isLoading={isLoading}
      >
        {action === "edit" ? "Update Fee" : "Complete Fee Setup"}
      </Button>
    </form>
  );
}
