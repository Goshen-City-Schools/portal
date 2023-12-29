import React, { useState } from "react";
import { Box, Text, Stack, Switch, StackDivider } from "@chakra-ui/react";

export default function PaymentMethodsConfigScreen() {
  const [paymentMethods, setPaymentMethods] = useState({
    cashDeposit: false,
    bankTransfer: false,
    payWithCard: false,
  });

  const { cashDeposit, payWithCard, bankTransfer } = paymentMethods;

  const handleToggleSwitch = () => {
    setPaymentMethods((prevFormData) => ({
      ...prevFormData,
      [name]: !prevFormData,
    }));
    setIsPaymentEnabled((prev) => !prev);
  };

  return (
    <Box px={4}>
      <Text fontWeight={"bold"} as={"h2"} mt={0} mb={8}>
        Accepted Payment Method
      </Text>

      <Stack
        spacing={4}
        p={2}
        divider={<StackDivider borderColor="gray.200" />}
      >
        <Stack
          direction="row"
          align="center"
          justifyContent={"space-between"}
          width={"full"}
        >
          <Text>Cash Deposit</Text>
          <Switch
            colorScheme="teal"
            size="md"
            name="cashDeposit"
            isChecked={cashDeposit}
            onChange={handleToggleSwitch}
          />
        </Stack>

        <Stack
          direction="row"
          align="center"
          justifyContent={"space-between"}
          width={"full"}
        >
          <Text>Pay in Bank / Transfer</Text>
          <Switch
            colorScheme="teal"
            name="bankTransfer"
            size="md"
            isChecked={bankTransfer}
            onChange={handleToggleSwitch}
          />
        </Stack>

        <Stack
          direction="row"
          align="center"
          justifyContent={"space-between"}
          width={"full"}
        >
          <Text>Pay with Card</Text>
          <Switch
            colorScheme="teal"
            name="payWithCarf"
            size="md"
            isChecked={payWithCard}
            onChange={handleToggleSwitch}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
