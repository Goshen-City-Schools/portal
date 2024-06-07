import { Button } from "@chakra-ui/react";
import { MdUpload } from "react-icons/md";

export default function FormButton({
  label,
  loading,
  type = "submit",
  ...params
}) {
  return (
    <Button
      w={"max-content"}
      // leftIcon={}
      mt={4}
      py={3}
      px={4}
      mx={"auto"}
      rounded={"sm"}
      bg={"blue.600"}
      minW={"144px"}
      minH={"48px"}
      textColor={"white"}
      type={type}
      isLoading={loading}
      {...params}
    >
      {label}
    </Button>
  );
}
