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
import CustomSelect from "../../shared/Select.component";
import { useModal } from "../../../app/contexts/ModalContext";
import { useNavigate } from "react-router-dom";
import { useClassDetails, useClasses } from "../../../hooks/school_classes";
import { createFee } from "../../../api/fees.api";
import { useFees } from "../../../hooks";

// ... (your existing imports)

export default function TuitionFeeForm({ action, feeTypeId, existingData }) {
  const toast = useToast();
  const { closePortal } = useModal();
  const { schoolClasses } = useClasses();
  const { fees } = useFees("tuition");
  const navigate = useNavigate();

  // Get classes that their fees has not been set.
  const filteredSchoolClasses = schoolClasses.filter((schoolClass) => {
    const classIdExistsInFees = fees?.some(
      (fee) => fee.classId === schoolClass._id
    );

    return !classIdExistsInFees;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    schoolClass: existingData?.classId || "",
    newStudentPrice: existingData?.price.new || null,
    existingStudentPrice: existingData?.price.existing || null,
    status: true,
  });

  const { classDetails } = useClassDetails(formData.schoolClass);

  const [successTimeout, setSuccessTimeout] = useState(null);
  const [redirectTimeout, setRedirectTimeout] = useState(null);

  useEffect(() => {
    if (action === "edit" && feeTypeId) {
      // Fetch existing data for the selected class and set it as the initial form data
      const existingData = fees.find((fee) => fee._id === feeTypeId);

      console.log(fees, existingData);

      if (existingData) {
        setFormData({
          schoolClass: existingData?.classId,
          newStudentPrice: existingData?.price.new.toString(),
          existingStudentPrice: existingData?.price.existing.toString(),
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
      type: "tuition",
      price: {
        new: parseInt(formData.newStudentPrice, 10),
        existing: parseInt(formData.existingStudentPrice, 10),
      },
      status: formData.status,
    };

    console.log(formData.schoolClass);

    try {
      const response = await createFee(tuitionFeeData.type, tuitionFeeData);

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
          value={formData?.schoolClass}
          onChange={handleFormChange}
          disabled={action === "edit"} // Disable selection if in edit mode
        >
          {action == "edit" ? (
            <option>{classDetails?.name}</option>
          ) : (
            <>
              <option value="">-- Select Class --</option>{" "}
              {filteredSchoolClasses.map((schoolClass) => (
                <option key={schoolClass._id} value={schoolClass._id}>
                  {schoolClass.name}{" "}
                </option>
              ))}
            </>
          )}
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
