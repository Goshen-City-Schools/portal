import React from "react";

import { Box, Flex, Text, Button, Grid, VStack } from "@chakra-ui/react";
import Avatar from "../components/Avatar.component";
import { useUser } from "../app/contexts/UserContext";

export default function ProfileScreen() {
  const { user } = useUser();
  return (
    <Box>
      <Flex>
        <Grid gap={4}>
          <Avatar width={180} height={180} imageUrl={"/avatar.png"} />
          <Button colorScheme="blue" size={"sm"}>
            Update avatar
          </Button>
        </Grid>

        <VStack gap={3}>
          <Text as={"h3"}>
            Name: <strong>{user.firstName}</strong>
          </Text>
          <Text as={"h3"}>
            Account Type: <strong>{user.accountType}</strong>{" "}
          </Text>
          <Text as={"h3"}>
            Staff Role: <strong>{user.roles[0]}</strong>
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
}
