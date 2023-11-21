import { Box, Flex, Text } from "@chakra-ui/react";
import IconComponent from "../Icon.component";

const InfoBox = ({ icon, label, children }) => (
  <Box>
    <Flex gap={4}>
      <IconComponent>{icon}</IconComponent>
      <Box>
        <Text as="h3" fontSize="sm" fontWeight="semibold">
          {label}
        </Text>
        <Text
          as="p"
          textTransform={label === "Email" ? "lowercase" : "capitalize"}
        >
          {children}
        </Text>
      </Box>
    </Flex>
  </Box>
);

export default InfoBox;
