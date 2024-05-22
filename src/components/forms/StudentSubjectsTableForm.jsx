import React from "react";

import DataTable from "../../widgets/Table.widget";
import { RowId } from "../tables/shared";
import { Switch } from "@chakra-ui/react";

import { Grid, Stack, FormLabel, FormControl, Select } from "@chakra-ui/react";
import { FormSelect } from "../shared";
import { useClassDetails, useClasses } from "../../hooks";

export default function StudentSubjectsTableForm({
  studentData,
  subjectsData,
  handleUserInputChange,
  formData,
  setFormData,
}) {
  const columns = React.useMemo(() => [
    {
      Header: "SN",
      accessor: "id",
      Cell: ({ row }) => <RowId row={row} />,
    },

    {
      Header: "Subjects",
      accessor: "name",
    },

    {
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) => (
        <Switch
          value={studentData?.subjects?.includes(row.original._id)}
          onChange={() => handleUserInputChange}
        />
      ),
    },
  ]);

  const { schoolClasses } = useClasses();

  const { classDetails } = useClassDetails(formData?.schoolClass);

  return (
    <Stack w={"full"}>
      {/* Class and Sub Class */}
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <FormSelect
          name={"studentType"}
          label={"Student Type"}
          data={[
            { name: "New", value: "new" },
            { name: "Existing", value: "existing" },
          ]}
          data_item_name={"name"}
          data_item_value={"value"}
          formData={formData}
          handleChange={handleUserInputChange}
        />

        <FormControl id={"studentClass"} className="">
          <FormLabel fontSize={"xs"} fontWeight={"semibold"}>
            Student Class
          </FormLabel>
          <Select
            fontSize={"sm"}
            name={"studentClass"}
            value={formData["studentClass"]}
            className="capitalize"
            bg={formData["studentClass"] ? "gray.100" : "white"}
            onChange={handleUserInputChange}
          >
            <option value="">-- Select Student Class --</option>
            {schoolClasses.map((schoolClass) => (
              <option
                value={schoolClass.id}
              >{`${schoolClass.schoolClass?.name} ${schoolClass.name}`}</option>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Stack w={"full"} mt={4}>
        <FormLabel fontSize={"sm"} fontWeight={"bold"}>
          Subjects
        </FormLabel>

        <DataTable
          fullWidthColumns={"Subjects"}
          columns={columns}
          data={subjectsData}
        />
      </Stack>
    </Stack>
  );
}
