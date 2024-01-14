import { Stack, Text, Switch, StackDivider, Select } from "@chakra-ui/react";
import { useState } from "react";

export default function SessionTermConfigScreen() {
  const [formData, setFormData] = useState({
    session: "20232024",
    term: "term1",
  });

  function handleInputChange(e) {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));

    setTimeout(() => {
      alert("updated");
    }, 2000);
  }

  return (
    <Stack
      spacing={4}
      py={2}
      px={4}
      divider={<StackDivider borderColor="gray.200" />}
    >
      {/* Session */}
      <Stack
        direction="row"
        align="center"
        justifyContent={"space-between"}
        width={"full"}
      >
        <Text fontSize={"sm"} fontWeight={"bold"}>
          Academic Year:
        </Text>

        <Select
          width={"max-content"}
          size={"sm"}
          name="session"
          fontSize={"sm"}
          value={formData.session}
          onChange={handleInputChange}
        >
          <option value="20232024">2023 - 2024</option>
          <option value="20242025">2024 - 2025</option>
        </Select>
      </Stack>

      {/* Term */}
      <Stack
        direction="row"
        align="center"
        justifyContent={"space-between"}
        width={"full"}
      >
        <Text fontSize={"sm"} fontWeight={"bold"}>
          Academic Term:
        </Text>

        <Select
          value={formData.term}
          width={"max-content"}
          size={"sm"}
          name="term"
          fontSize={"sm"}
          onChange={handleInputChange}
        >
          <option value="term1">First Term</option>
          <option value="term2">Second Term</option>
          <option value="term3">Third Term</option>
        </Select>
      </Stack>
    </Stack>
  );
}
