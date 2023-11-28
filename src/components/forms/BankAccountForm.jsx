import { useState } from "react";

import { Text, Flex, Button, useToast, Switch, Stack } from "@chakra-ui/react";

import { useModal } from "../../app/contexts/ModalContext";

export default function BankAccountForm({
  action,
  bankAccountId,
  existingData,
}) {
  const toast = useToast();
  const { closePortal } = useModal();
  // const [formData, setFormData] = useState({
  //   schoolClass: existingData?.classId || "",
  //   newStudentPrice: existingData?.price.new || null,
  //   existingStudentPrice: existingData?.price.existing || null,
  //   status: true,
  // });
  const [formData, setFormData] = useState({
    bankName: existingData.bankName || "",
    accountName: existingData.accountName,
    accountNumber: existingData.accountNumber || "",
    fees: existingData.fees || [],
    status: existingData.status || false,
  });
  const banks = [{ name: "Fidelity Bank", value: "fidelity_bank" }];

  const [successTimeout, setSuccessTimeout] = useState(null);
  const [redirectTimeout, setRedirectTimeout] = useState(null);

  useEffect(() => {
    if (action === "edit" && feeTypeId) {
      // Fetch existing data for the selected class and set it as the initial form data
      const existingData = fees.find((fee) => fee._id === feeTypeId);

      console.log(fees, existingData);

      if (existingData) {
        setFormData({
          bankName: existingData.bankName || "",
          accountName: existingData.accountName,
          accountNumber: existingData.accountNumber || "",
          fees: existingData.fees || [],
          status: existingData.status || false,
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
