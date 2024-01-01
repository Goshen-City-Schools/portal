import React, { useState } from "react";
import { Box, Text, Stack, Switch, StackDivider } from "@chakra-ui/react";

export default function PaymentMethodsConfigScreen() {
  const [paymentMethods, setPaymentMethods] = useState({
    cashDeposit: false,
    bankTransfer: false,
    payWithCard: false,
  });

  const { cashDeposit, payWithCard, bankTransfer } = paymentMethods;

  const handleToggleSwitch = (name) => {
    setPaymentMethods((prevFormData) => ({
      ...prevFormData,
      [name]: !prevFormData[name], // Fix: Use [name] to access the correct property
    }));
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
            colorScheme="facebook"
            size="md"
            name="cashDeposit"
            isChecked={cashDeposit}
            onChange={() => handleToggleSwitch("cashDeposit")}
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
            colorScheme="facebook"
            name="bankTransfer"
            size="md"
            isChecked={bankTransfer}
            onChange={() => handleToggleSwitch("bankTransfer")}
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
            colorScheme="facebook"
            name="payWithCard"
            size="md"
            isChecked={payWithCard}
            onChange={() => handleToggleSwitch("payWithCard")}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
