import React from "react";

import { Flex, Box, Text, Image } from "@chakra-ui/react";

export default function StatCardComponent({
  color,
  imgSrc,
  text,
  number,
  imagePadding,
  size,
  onClick,
}) {
  return (
    <Box
      bgColor={"white"}
      cursor={"pointer"}
      width={"full"}
      border={"1px solid transparent"}
      px={6}
      py={4}
      rounded={"md"}
      _hover={{ bg: "accent.100", borderColor: "neutral.700" }}
      animation={"ease-in-out"}
      transitionDuration={".3s"}
      onClick={onClick}
    >
      <Box
        p={imagePadding && imagePadding}
        h={size ? size : 12}
        w={size ? size : 12}
        rounded={"full"}
        bgColor={color}
        mb={3}
        overflow={"hidden"}
      >
        <Image
          src={`/public/illustrations/${imgSrc}`}
          objectFit={"cover"}
          h={"full"}
          w={"full"}
          alt=""
        />
      </Box>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text
          as={"p"}
          fontSize={"sm"}
          fontWeight={"semibold"}
          color={"neutral.700"}
        >
          {text}
        </Text>
        <Text as={"h3"} fontWeight={"bold"} fontSize={"2xl"}>
          {number}
        </Text>
      </Flex>
    </Box>
  );
}
