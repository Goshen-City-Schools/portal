import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
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

import { useModal } from "../../../app/contexts/ModalContext";
import CustomSelect from "../../shared/Select.component";

export default function BusFeeForm({ action, existingData }) {
  const toast = useToast();
  const { closePortal } = useModal();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    session: existingData?.session || "",
    term: existingData?.term || "",
    destination: existingData?.destination || "",
    toPrice: existingData?.price?.to || null,
    fromPrice: existingData?.price?.from || null,
    toFromPrice: existingData?.price?.toFrom || null,
    status: true,
  });

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

    const {
      session,
      term,
      destination,
      toPrice,
      fromPrice,
      toFromPrice,
      status,
    } = formData;

    console.log(formData);

    if (
      !session ||
      !term ||
      !destination ||
      !toPrice ||
      !fromPrice ||
      !toFromPrice
    ) {
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

    const busFeeData = {
      session: session,
      term: term,
      destination: destination,
      type: "bus",
      price: {
        from: parseInt(toPrice, 10),
        to: parseInt(fromPrice, 10),
        toFrom: parseInt(toFromPrice, 10),
      },
      status: status,
    };

    try {
      await createFee(busFeeData.type, busFeeData);

      setIsLoading(false);

      setFormData({
        session: "",
        term: "",
        destination: "",
        toPrice: "",
        fromPrice: "",
        toFromPrice: "",
        status: false,
      });

      closePortal();

      const successToastId = showToast({
        title: `${session} ${term} Bus Fee for ${destination} created successfully!`,
        status: "success",
        duration: 2000,
        position: "top-right",
      });

      setSuccessTimeout(successToastId);

      const redirectTimeoutId = setTimeout(() => {
        navigate("/admin/config");
      }, 1000);

      setRedirectTimeout(redirectTimeoutId);
    } catch (error) {
      console.error("Error creating bus destination fee:", error.message);

      setIsLoading(false);

      showToast({
        title: "Failed to create bus fee",
        description: error.message || "An unexpected error occurred",
        status: "error",
        duration: 5000,
        position: "top-right",
      });
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-6 px-2">
      {/* Session and Term Select */}
      <Flex gap={4}>
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
      </Flex>

      {/* Destination */}
      <FormControl>
        <FormLabel fontSize="sm" fontWeight="bold">
          Destination
        </FormLabel>
        <Input
          name="destination"
          fontSize="sm"
          type="text"
          autoComplete="off"
          onChange={handleFormChange}
          value={formData.destination}
          placeholder="Bus Destination Route"
        />
      </FormControl>

      {/* Prices - from, to, from and to */}
      <fieldset>
        <FormControl>
          <FormLabel fontSize="sm" fontWeight="bold">
            Price
          </FormLabel>

          <Flex gap={4}>
            <Input
              name="fromPrice"
              fontSize="sm"
              type="number"
              pattern="[0-9]*"
              autoComplete="off"
              onChange={handleFormChange}
              value={formData.fromPrice}
              placeholder="From Destination Price"
            />

            <Input
              name="toPrice"
              fontSize="sm"
              autoComplete="off"
              type="number"
              pattern="[0-9]*"
              onChange={handleFormChange}
              value={formData.toPrice}
              placeholder="To Destination Fee"
            />

            <Input
              name="toFromPrice"
              fontSize="sm"
              autoComplete="off"
              type="number"
              pattern="[0-9]*"
              onChange={handleFormChange}
              value={formData.toFromPrice}
              placeholder="To and Fro Price"
            />
          </Flex>
        </FormControl>
      </fieldset>

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

      {/* Submit Button */}
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
