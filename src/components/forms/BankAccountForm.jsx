import { useState } from "react";

import {
  Text,
  Flex,
  Button,
  useToast,
  Switch,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Badge,
} from "@chakra-ui/react";
import CustomSelect from "../shared/Select.component";
import { useFees } from "../../hooks";

export default function BankAccountForm({ action, existingData }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { fees } = useFees();

  // Define names for each fee type
  const feeNames = {
    boardingFees: "Boarding Fees",
    busFees: "Bus Fees",
    tuitionFees: "Tuition Fees",
  };

  // Use Object.entries to get key-value pairs and map to a new array
  const feeArray = Object.entries(fees).map(([feeType]) => ({
    feeType,
    feeName: feeNames[feeType], // Use the predefined name for each fee type
  }));

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

  // Function Handle User Input Change
  function handleFormChange(e) {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
  }

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
            onChange={handleFormChange}
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
            name="accountNumber"
            onChange={handleFormChange}
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
            name="accountName"
            onChange={handleFormChange}
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

          {feeArray?.map(({ feeName }, index) => (
            <Badge
              bg={"brand.100"}
              textColor={"brand.900"}
              px={3}
              border={"1px"}
              py={1}
              key={index}
            >
              {feeName}
            </Badge>
          ))}
        </FormControl>

        {/* Bank Status */}
        <Flex mt={2} justifyContent={"space-between"}>
          <Text as={"p"} fontSize={"sm"} fontWeight={"bold"}>
            Status
          </Text>
          <Switch value={formData.status} onChange={() => handleFormChange} />
        </Flex>

        <Button
          colorScheme={"facebook"}
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
