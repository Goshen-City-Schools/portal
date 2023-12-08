import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";

export default function FormTextArea({
  name,
  label,
  formData,
  placeholder = label,
  handleChange,
}) {
  return (
    <FormControl>
      <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
        {label}
      </FormLabel>
      <Textarea
        fontSize={"sm"}
        resize={"none"}
        height={16}
        name="contactAddress"
        placeholder={placeholder}
        value={formData[name]}
        onChangeCapture={handleChange}
      />
    </FormControl>
  );
}
