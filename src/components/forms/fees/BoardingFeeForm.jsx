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
import { useUser } from "../../../app/contexts/UserContext";

export default function BoardingFeeForm({ action, existingData }) {
  const toast = useToast();
  const { closePortal } = useModal();
  const { setInfoIsUpdated } = useUser();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    session: existingData?.session || "",
    term: existingData?.term || "",
    gender: existingData?.gender || "",
    price: existingData?.price || null,
    status: true,
  });

  const [successTimeout, setSuccessTimeout] = useState(null);
  const [redirectTimeout, setRedirectTimeout] = useState(null);

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

    const { session, term, gender, price, status } = formData;

    if (!session || !term || !gender || !price) {
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
      session: session,
      term: term,
      gender: gender,
      type: "boarding",
      price: parseInt(price, 10),
      status: status,
    };

    try {
      await createFee(boardingFeeData.type, boardingFeeData);

      setIsLoading(false);

      setFormData({
        session: "",
        term: "",
        gender: "",
        price: "",
        status: false,
      });

      closePortal();

      const successToastId = showToast({
        title: `${session} ${term} boarding Fee for ${gender} students created successfully!`,
        status: "success",
        duration: 2000,
        position: "top-right",
      });

      setSuccessTimeout(successToastId);

      const redirectTimeoutId = setTimeout(() => {
        navigate("/admin/config");
      }, 1000);

      setInfoIsUpdated(true);
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
      {/* Session Select */}
      <FormControl>
        <FormLabel fontSize="sm" fontWeight="bold">
          Session
        </FormLabel>
        <CustomSelect
          name="session"
          value={formData?.session}
          onChange={handleFormChange}
          disabled={action === "edit"} // Disable selection if in edit mode
        >
          <option value="">-- Select Session --</option>
          <option value="20222023">2022 - 2023</option>
          <option value="20232024">2023 - 2024</option>
          <option value="20242025">2024 - 2025</option>
        </CustomSelect>
      </FormControl>

      {/* Term Select */}
      <FormControl>
        <FormLabel fontSize="sm" fontWeight="bold">
          Term
        </FormLabel>
        <CustomSelect
          name="term"
          value={formData?.term}
          onChange={handleFormChange}
          disabled={action === "edit"} // Disable selection if in edit mode
        >
          <option value="">-- Select Term --</option>
          <option value="term1">First Term</option>
          <option value="term2">Second Term</option>
          <option value="term3">Third Term</option>
        </CustomSelect>
      </FormControl>

      {/* Gender Select */}
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
          <option value="">-- Select Gender --</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </CustomSelect>
      </FormControl>

      {/* Hostel Fee */}
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

      {/* Fee Status */}
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

      {/* Submit button */}
      <Button
        my={4}
        fontSize="sm"
        colorScheme="facebook"
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
