import { Image } from "@chakra-ui/react";

const Avatar = ({ imageUrl, altText, width = 40, height = 40, className }) => {
  return (
    <div
      className={`relative rounded-full overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <Image
        src={imageUrl}
        alt={altText}
        height={"full"}
        width={"full"}
        objectFit={"cover"}
      />
    </div>
  );
};

export default Avatar;
