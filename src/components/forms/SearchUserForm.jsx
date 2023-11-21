import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

const SearchUserForm = ({ accountType, handleSubmit }) => {
  const userIdRef = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(userIdRef.current.value);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FormControl>
        <FormLabel fontSize={"sm"} fontWeight={"bold"}>
          Enter {accountType === "staff" ? "Student" : "Staff"} ID:
        </FormLabel>
        <Input type="text" ref={userIdRef} />
      </FormControl>
      <Button mb={4} fontSize={"sm"} colorScheme={"blue"} type="submit">
        View {accountType === "staff" ? "Student" : "Staff"} Profile
      </Button>
    </form>
  );
};

export default SearchUserForm;
