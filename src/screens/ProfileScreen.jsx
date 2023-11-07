import React from "react";

import { Box, Flex, Text, Button, Grid } from "@chakra-ui/react";
import Avatar from "../components/Avatar.component";

export default function ProfileScreen({ user }) {
  return (
    <Box>
      <Flex>
        <Grid gap={4}>
          <Avatar width={180} height={180} imageUrl={"/avatar.png"} />
          <Button colorScheme="blue" size={"sm"}>
            Update avatar
          </Button>
        </Grid>

        <Text as={"h2"}>{user.name}</Text>
      </Flex>
    </Box>
  );
}
