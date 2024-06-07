import { Box, Flex, Text } from "@chakra-ui/react";
import IconComponent from "../Icon.component";

const InfoBox = ({ icon, label, children }) => (
  <Box>
    <Flex gap={2}>
      <IconComponent>{icon}</IconComponent>
      <Flex flexDirection={"column"} gap={1}>
        <Text as="h3" fontSize="18" fontWeight="semibold">
          {label}
        </Text>
        <Text
          as="p"
          textTransform={label === "Email" ? "lowercase" : "capitalize"}
        >
          {children}
        </Text>
      </Flex>
    </Flex>
  </Box>
);

export default InfoBox;
