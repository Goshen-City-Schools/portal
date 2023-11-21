import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

const ViewStaffForm = ({ handleSubmit }) => {
  const staffIdRef = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(staffIdRef.current.value);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FormControl>
        <FormLabel fontSize={"sm"} fontWeight={"bold"}>
          Enter Staff ID:
        </FormLabel>
        <Input type="text" ref={staffIdRef} />
      </FormControl>
      <Button mb={4} fontSize={"sm"} colorScheme={"blue"} type="submit">
        View Staff Profile
      </Button>
    </form>
  );
};

export default ViewStaffForm;
