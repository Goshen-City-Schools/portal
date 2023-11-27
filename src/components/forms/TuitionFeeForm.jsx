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
import CustomSelect from "../shared/Select.component";
import { useModal } from "../../app/contexts/ModalContext";
import { useNavigate } from "react-router-dom";
import { useClasses } from "../../hooks/SchoolClasses";
import { createFee } from "../../api/fees.api";

// ... (your existing imports)

export default function TuitionFeeForm() {
  const toast = useToast();
  const { closePortal } = useModal();
  const { schoolClasses } = useClasses();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    schoolClass: "",
    newStudentPrice: "",
    existingStudentPrice: "",
    status: false,
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

    const { schoolClass, newStudentPrice, existingStudentPrice, status } =
      formData;

    if (!schoolClass || !newStudentPrice || !existingStudentPrice) {
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

    const tuitionFeeData = {
      classId: formData.schoolClass,
      feeType: "tuition",
      price: {
        new: parseInt(formData.newStudentPrice, 10),
        existing: parseInt(formData.existingStudentPrice, 10),
      },
    };

    try {
      const response = await createFee(tuitionFeeData);

      setIsLoading(false);

      setFormData({
        schoolClass: "",
        newStudentPrice: "",
        existingStudentPrice: "",
        status: false,
      });

      closePortal();

      const successToastId = showToast({
        title: `Tuition Fee for ${schoolClass} created successfully!`,
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
      console.error("Error creating tuition fee:", error.message);

      setIsLoading(false);

      showToast({
        title: "Failed to create tuition fee",
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
          Class
        </FormLabel>
        <CustomSelect
          name="schoolClass"
          value={formData.schoolClass}
          onChange={handleFormChange}
        >
          <option value="">-- Select Class --</option>
          {schoolClasses.map((schoolClass) => (
            <option key={schoolClass.id} value={schoolClass.id}>
              {schoolClass.name}
            </option>
          ))}
        </CustomSelect>
      </FormControl>

      {/* Select Account Type fee is for */}
      <FormControl>
        <FormLabel fontSize="sm" fontWeight="bold">
          New Student Tuition Fee
        </FormLabel>
        <Input
          name="newStudentPrice"
          fontSize="sm"
          type="number"
          pattern="[0-9]*"
          autoComplete="off"
          onChange={handleFormChange}
          value={formData.newStudentPrice}
          placeholder="New Student Schoolfees"
        />
      </FormControl>

      {/* Select Account Type fee is for */}
      <FormControl>
        <FormLabel fontSize="sm" fontWeight="bold">
          Existing Student Tuition Fee
        </FormLabel>
        <Input
          name="existingStudentPrice"
          fontSize="sm"
          autoComplete="off"
          type="number"
          pattern="[0-9]*"
          onChange={handleFormChange}
          value={formData.existingStudentPrice}
          placeholder="Old Student Schoolfees"
        />
      </FormControl>

      {/* Tuition Fee Status */}
      <Flex mt={2} justifyContent="space-between" alignItems="center">
        <Text as="p" fontSize="sm" fontWeight="bold">
          Fee Status
        </Text>
        <Switch value={formData.status} onChange={handleFormChange} />
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
        Complete Fee Setup
      </Button>
    </form>
  );
}
