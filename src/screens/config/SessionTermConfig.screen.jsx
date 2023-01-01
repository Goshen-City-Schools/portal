import { Stack, Text, Switch, StackDivider, Select } from "@chakra-ui/react";

export default function SessionTermConfigScreen() {
  const academicData = {
    session: "20232024",
    term: "term1",
  };
  return (
    <Stack spacing={4} p={2} divider={<StackDivider borderColor="gray.200" />}>
      {/* Session */}
      <Stack
        direction="row"
        align="center"
        justifyContent={"space-between"}
        width={"full"}
      >
        <Text>Session</Text>

        <Select value={academicData.session}>
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
        <Text>Term</Text>

        <Select value={academicData.term}>
          <option value="term1">First Term</option>
          <option value="term2">Second Term</option>
          <option value="term3">Third Term</option>
        </Select>
      </Stack>
    </Stack>
  );
}
