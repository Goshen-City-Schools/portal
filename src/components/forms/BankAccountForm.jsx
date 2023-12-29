import { useState } from "react";

import {
  Text,
  Flex,
  Button,
  useToast,
  Switch,
  Stack,
  FormControl,
} from "@chakra-ui/react";
import CustomSelect from "../shared/Select.component";

export default function BankAccountForm({ action, existingData }) {
  const toast = useToast();

  const [formData, setFormData] = useState({
    bankName: existingData?.bankName || "",
    accountName: existingData?.accountName,
    accountNumber: existingData?.accountNumber || "",
    fees: existingData?.fees || [],
    status: existingData?.status || false,
  });
  const banks = [{ name: "Fidelity Bank", value: "fidelity_bank" }];

  const showToast = (options) => {
    const toastId = toast(options);
    return toastId;
  };

  function handleSubmitCreateEvent(e) {
    e.preventDefault();

    if (
      !formData.event_name ||
      !formData.event_description ||
      !formData.event_startDate ||
      !formData.event_notification
    ) {
      toast({
        title: "All bank fields are required!",
        position: "top-right",
        status: "error",
        duration: "1100",
      });
      return;
    }

    if (isPeriodicEvent) {
      if (!formData.event_period) {
        toast({
          title: "All bank fields are required!",
          position: "top-right",
          status: "error",
          duration: "1100",
        });
        return;
      }
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      toast({
        title: `${formData.event_name} event created successfully!`,
        position: "top-right",
        status: "success",
        duration: "1200",
      });
      closePortal();
    }, 1600);
  }

  // Function Handle User Input Change
  function handleUserInputChange() {}

  // Handle Form Submit Function
  function handleFormSubmit(e) {
    e.preventDefault();
    console.log("Form submitted");
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Stack spacing={4} mb={4}>
        {/* Bank Name */}
        <FormControl
          my={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <FormLabel flexShrink={0} fontSize={"sm"} fontWeight={"bold"}>
            Bank Name
          </FormLabel>

          <CustomSelect
            name="bankName"
            onChange={handleUserInputChange}
            value={formData.bankName}
          >
            <option value="">-- Select Bank --</option>

            {banks.map((bank) => (
              <option value={bank.value}>{bank.name}</option>
            ))}
          </CustomSelect>
        </FormControl>

        {/* Account Number */}
        <FormControl
          my={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <FormLabel flexShrink={0} fontSize={"sm"} fontWeight={"bold"}>
            Account Number
          </FormLabel>

          <Input
            type="text"
            size={"sm"}
            name="name"
            onChange={handleUserInputChange}
            value={formData.accountNumber}
          />
        </FormControl>

        {/* Account Name */}
        <FormControl
          my={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <FormLabel flexShrink={0} fontSize={"sm"} fontWeight={"bold"}>
            Account Name
          </FormLabel>

          <Input
            type="text"
            size={"sm"}
            name="name"
            onChange={handleUserInputChange}
            value={formData.accountName}
          />
        </FormControl>

        {/* TODO:  */}
        {/* Fees assigned to Bank Account */}
        <FormControl
          my={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <FormLabel flexShrink={0} fontSize={"sm"} fontWeight={"bold"}>
            Fees
          </FormLabel>

          <Input
            type="text"
            size={"sm"}
            name="name"
            onChange={handleUserInputChange}
            value={formData.accountNumber}
          />
        </FormControl>

        {/* Bank Status */}
        <Flex mt={2} justifyContent={"space-between"}>
          <Text as={"p"} fontSize={"sm"} fontWeight={"bold"}>
            Status
          </Text>
          <Switch
            value={formData.status}
            onChange={() => handleUserInputChange}
          />
        </Flex>

        <Button
          colorScheme={"green"}
          w={"max-content"}
          fontSize={"sm"}
          mx={"auto"}
          isLoading={isLoading}
          mt={2}
          type="submit"
        >
          Add Bank Account
        </Button>
      </Stack>
    </form>
  );
}
