import { useState, useEffect, useRef } from "react";
import { Stack, FormControl, FormLabel, Input, Box } from "@chakra-ui/react";
import FormInput from "./FormInput";

const DynamicSuggestionDropdown = ({
  label,
  placeholder,
  options,
  onChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    // Close the box when the input is empty
    if (searchTerm.trim() === "") {
      setFilteredOptions([]);
      setIsBoxOpen(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    // Close the box when outside the box is clicked
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setIsBoxOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);

    // Filter options based on input value
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
    setIsBoxOpen(true);
  };

  const handleSelectOption = (option) => {
    setSearchTerm(option);
    setIsBoxOpen(false);
    onChange(option);
  };

  return (
    <Stack spacing={4} w={"full"} position={"relative"}>
      <FormControl>
        <FormInput
          label={label}
          placeholder={placeholder}
          name={searchTerm}
          handleChange={handleInputChange}
          data={{}}
        />
      </FormControl>

      {isBoxOpen && (
        <Box
          bg={"white"}
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          p={2}
          position="absolute"
          zIndex="1"
          width="100%"
          top="100%"
          ref={boxRef}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option._id}
                onClick={() => handleSelectOption(option)}
                style={{ cursor: "pointer" }}
              >
                {option.title} {option.firstName} {option.lastName}
              </div>
            ))
          ) : (
            <div>No records found</div>
          )}
        </Box>
      )}
    </Stack>
  );
};

export default DynamicSuggestionDropdown;
