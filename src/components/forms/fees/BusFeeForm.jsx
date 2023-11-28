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

import { useModal } from "../../../app/contexts/ModalContext";
import { useFees } from "../../../hooks";

export default function BusFeeForm({ action, feeTypeId, existingData }) {
  const toast = useToast();
  const { closePortal } = useModal();
  const { fees } = useFees("bus");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    destination: existingData?.destination || "",
    toPrice: existingData?.toPrice || null,
    fromPrice: existingData?.fromPrice || null,
    toFromPrice: existingData?.toFromPrice || null,
    status: true,
  });

  const [successTimeout, setSuccessTimeout] = useState(null);
  const [redirectTimeout, setRedirectTimeout] = useState(null);

  useEffect(() => {
    if (action === "edit" && feeTypeId) {
      // Fetch existing data for the selected class and set it as the initial form data
      const existingData = fees.find((fee) => fee._id === feeTypeId);

      console.log(fees, existingData);

      if (existingData) {
        setFormData({
          destination: existingData?.destination || "",
          toPrice: existingData?.toPrice || null,
          fromPrice: existingData?.fromPrice || null,
          toFromPrice: existingData?.toFromPrice || null,
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

    const { destination, toPrice, fromPrice, toFromPrice, status } = formData;

    if (!destination || !toPrice || !fromPrice || toFromPrice) {
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
      const response = await createFee(busFeeData.type, busFeeData);

      setIsLoading(false);

      setFormData({
        destination: "",
        toPrice: "",
        fromPrice: "",
        toFromPrice: "",
        status: false,
      });

      closePortal();

      const successToastId = showToast({
        title: `Bus Fee for ${destination} created successfully!`,
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
      {/* Fee name */}
      <FormControl>
        <FormLabel fontSize="sm" fontWeight="bold">
          Destination
        </FormLabel>
        <Input
          name="destination"
          fontSize="sm"
          type="number"
          pattern="[0-9]*"
          autoComplete="off"
          onChange={handleFormChange}
          value={formData.destination}
          placeholder="Bus Destination Route"
        />
      </FormControl>

      <fieldset>
        <FormControl>
          <FormLabel fontSize="sm" fontWeight="bold">
            Price
          </FormLabel>

          <Flex>
            <Input
              name="fromPrice"
              fontSize="sm"
              type="number"
              pattern="[0-9]*"
              autoComplete="off"
              onChange={handleFormChange}
              value={formData.fromPrice}
              placeholder="From Destination Fee"
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
              placeholder="To and Fro Destination Fee"
            />
          </Flex>
        </FormControl>
      </fieldset>

      {/* Bus Fee Status */}
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
