import React from "react";

import { Box, Flex, Text, Button, Grid } from "@chakra-ui/react";
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

        <Text as={"h2"}>{user.firstName}</Text>
      </Flex>
    </Box>
  );
}
