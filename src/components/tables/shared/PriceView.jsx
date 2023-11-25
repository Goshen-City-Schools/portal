import React from "react";

import { Text } from "@chakra-ui/react";
import formatCurrency from "../../../helpers/formatCurrency";

export default function PriceView({ value }) {
  return (
    <Text as={"p"} fontWeight={"bold"}>
      {formatCurrency(value)}
    </Text>
  );
}
