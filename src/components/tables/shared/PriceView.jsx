import React from "react";

import { Text } from "@chakra-ui/react";
import formatCurrency from "../../../helpers/formatCurrency";

export default function PriceView({ value, onClick, color }) {
  return (
    <Text color={color} onClick={onClick} as={"p"} fontWeight={"bold"}>
      {formatCurrency(value)}
    </Text>
  );
}
