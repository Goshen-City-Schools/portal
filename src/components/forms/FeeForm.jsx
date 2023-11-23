import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Button,
  Flex,
  Input,
  useToast,
} from "@chakra-ui/react";
import CustomSelect from "../shared/Select.component";
import { useModal } from "../../app/contexts/ModalContext";
import { useNavigate } from "react-router-dom";

export default function FeeForm() {
  const toast = useToast();
  const { closePortal } = useModal();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [requestData, setRequestData] = useState({
    feeName: "",
    accountType: "",
    paymentFrequency: "",
    studentType: "",
  });
  const [successTimeout, setSuccessTimeout] = useState(null);
  const [redirectTimeout, setRedirectTimeout] = useState(null);

  useEffect(() => {
    // Cleanup timeouts when the component unmounts
    return () => {
      if (successTimeout) clearTimeout(successTimeout);
      if (redirectTimeout) clearTimeout(redirectTimeout);
    };
  }, [successTimeout, redirectTimeout]);

  function handleFormChange(e) {
    const { name, value } = e.target;
    setRequestData({ ...requestData, [name]: value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (
      !requestData.feeName ||
      !requestData.accountType ||
      !requestData.paymentFrequency
    ) {
      return toast({
        title: "All fields are required!",
        status: "error",
        duration: "600",
        position: "top-right",
      });
    }

    if (requestData.accountType === "student" && !requestData.studentType) {
      return toast({
        title: "Student type field is required!",
        status: "error",
        duration: "600",
        position: "top-right",
      });
    }

    // Start loading
    setIsLoading(true);

    // Simulate asynchronous operation (replace with your actual API call)
    const successTimeoutId = setTimeout(() => {
      // Stop loading
      setIsLoading(false);

      // Clear the form
      setRequestData({
        feeName: "",
        accountType: "",
        paymentFrequency: "",
        studentType: "",
      });

      closePortal();

      toast({
        title: "Fee created successfully!",
        status: "success",
        duration: 3000,
        position: "top-right",
      });

      // Set the success timeout ID to state
      setSuccessTimeout(null);
    }, 2000); // Simulated delay for demonstration purposes

    // Set the success timeout ID to state
    setSuccessTimeout(successTimeoutId);

    // Set redirect timeout after a delay
    const redirectTimeoutId = setTimeout(() => {
      navigate("/admin/finance/fees");
    }, 1000);

    // Set the redirect timeout ID to state
    setRedirectTimeout(redirectTimeoutId);
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
      {/* Fee name */}
      <FormControl>
        <FormLabel fontSize={"sm"} fontWeight={"bold"}>
          Fee Name
        </FormLabel>
        <Input
          name="feeName"
          fontSize={"sm"}
          type="text"
          onChange={handleFormChange}
          value={requestData.feeName}
          placeholder="Name of fee"
        />
      </FormControl>

      {/* Select Account Type fee is for */}
      <FormControl>
        <FormLabel fontSize={"sm"} fontWeight={"bold"}>
          Paid by
        </FormLabel>
        <CustomSelect
          name="accountType"
          value={requestData.accountType}
          onChange={handleFormChange}
        >
          <option value="">-- --</option>
          <option value="staff">Staff</option>
          <option value="student">Student</option>
        </CustomSelect>
      </FormControl>

      {/* If Account Type is student, select student type */}
      {requestData.accountType === "student" && (
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"bold"}>
            Student Type
          </FormLabel>
          <CustomSelect
            name="studentType"
            value={requestData.studentType}
            onChange={handleFormChange}
          >
            <option value="">-- --</option>
            <option value="all">All Students</option>
            <option value="new">New Students</option>
            <option value="returning">Returning Students</option>
          </CustomSelect>
        </FormControl>
      )}

      {/* Select Payment Frequency*/}
      <FormControl>
        <FormLabel fontSize={"sm"} fontWeight={"bold"}>
          Payment Frequency
        </FormLabel>
        <CustomSelect
          value={requestData.paymentFrequency}
          name="paymentFrequency"
          onChange={handleFormChange}
        >
          <option value="">-- --</option>
          <option value="once">Once</option>
          <option value="everyTerm">Every Term</option>
          <option value="everySession">Every Academic Session</option>
        </CustomSelect>
      </FormControl>

      {/* Submit request button */}
      <Button
        my={4}
        fontSize={"sm"}
        colorScheme={"green"}
        width={"max-content"}
        mx={"auto"}
        type="submit"
        isLoading={isLoading}
      >
        Create Fee
      </Button>
    </form>
  );
}
