import React, { useState } from "react";
import { Box, Text, Stack, Switch, StackDivider } from "@chakra-ui/react";

export default function PaymentMethodsConfigScreen() {
  const [isPaymentEnabled, setIsPaymentEnabled] = useState(false);

  const handleToggleSwitch = () => {
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
          <Text>Bank Deposit</Text>
          <Switch
            colorScheme="teal"
            size="md"
            isChecked={isPaymentEnabled}
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
            size="md"
            isChecked={isPaymentEnabled}
            onChange={handleToggleSwitch}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
