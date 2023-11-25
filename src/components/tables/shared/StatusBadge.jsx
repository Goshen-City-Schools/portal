import React from "react";

import { Badge } from "@chakra-ui/react";

export default function StatusBadge({ value }) {
  return (
    <Badge w={"max-content"} colorScheme={value ? "green" : "red"} mr="2">
      {value ? "Active" : "Inactive"}
    </Badge>
  );
}
