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
  maxW,
}) {
  return (
    <Box
      bgColor={"white"}
      cursor={"pointer"}
      width={"full"}
      border={"1px solid transparent"}
      px={6}
      py={4}
      h={"133px"}
      flexShrink={0}
      shadow={"sm"}
      rounded={"md"}
      _hover={{ bg: "brand.50", borderColor: "brand.700" }}
      animation={"ease-in-out"}
      transitionDuration={".3s"}
      onClick={onClick}
      className="md:max-w-xs"
    >
      <Box
        p={imagePadding && imagePadding}
        h={size ? size : 12}
        w={size ? size : 12}
        rounded={"full"}
        bgColor={color}
        mb={3}
        overflow={"hidden"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Image
          src={`/illustrations/${imgSrc}`}
          objectFit={"cover"}
          h={"full"}
          w={"full"}
          alt=""
        />
      </Box>
      <Flex justifyContent={"space-between"} mt={4} alignItems={"center"}>
        <Text as={"p"} color={"neutral.700"} fontWeight={500}>
          {text}
        </Text>
        <Text as={"h3"} fontWeight={600} fontSize={"3xl"}>
          {number}
        </Text>
      </Flex>
    </Box>
  );
}
