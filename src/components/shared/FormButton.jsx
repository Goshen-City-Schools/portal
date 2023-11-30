import { Button } from "@chakra-ui/react";
import { MdUpload } from "react-icons/md";

export default function FormButton({ label, loading }) {
  return (
    <Button
      w={"max-content"}
      leftIcon={<MdUpload />}
      mt={4}
      mx={"auto"}
      colorScheme="blue"
      type="submit"
      size={"sm"}
      isLoading={loading}
    >
      {label}
    </Button>
  );
}
