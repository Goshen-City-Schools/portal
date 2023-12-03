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
      leftIcon={<MdUpload />}
      mt={4}
      mx={"auto"}
      colorScheme="blue"
      type={type}
      size={"sm"}
      isLoading={loading}
      {...params}
    >
      {label}
    </Button>
  );
}
