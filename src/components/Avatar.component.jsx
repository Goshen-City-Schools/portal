import { Image, Box } from "@chakra-ui/react";

const Avatar = ({ imageUrl, altText, width = 40, height = 40, className }) => {
  return (
    <Box
      className={`relative h-44 w-44 rounded-full border-2 shrink-0 border-gray-50 overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <Image
        src={imageUrl}
        alt={altText}
        height={"full"}
        width={"full"}
        objectFit={"cover"}
      />
    </Box>
  );
};

export default Avatar;
