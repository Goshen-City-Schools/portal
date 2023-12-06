import { Text } from "@chakra-ui/react";

export default function PortalTitle({ title }) {
  return (
    <Text
      as={"h3"}
      fontWeight={"bold"}
      textAlign={"center"}
      fontSize={"2xl"}
      mb={"6"}
    >
      {title}
    </Text>
  );
}
