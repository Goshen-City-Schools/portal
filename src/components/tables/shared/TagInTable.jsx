import React from "react";

import { Tag } from "@chakra-ui/react";

export default function TagInTable({
  label,
  colorScheme,
  variant,
  ...properties
}) {
  return (
    <Tag
      flexShrink={0}
      size="sm"
      key={index}
      variant={variant}
      fontWeight={"semibold"}
      colorScheme={colorScheme}
      {...properties}
    >
      {label}
    </Tag>
  );
}
