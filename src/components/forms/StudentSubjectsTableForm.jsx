import React from "react";

import DataTable from "../../widgets/Table.widget";
import { RowId } from "../tables/shared";
import { Switch } from "@chakra-ui/react";

import { Grid, Stack, FormLabel } from "@chakra-ui/react";
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
      <Grid
        gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={4}
        mb={"4"}
      >
        <FormSelect
          name={"schoolClass"}
          label={"Class"}
          data={schoolClasses}
          data_item_name={"name"}
          data_item_value={"_id"}
          formData={formData}
          handleChange={handleUserInputChange}
        />

        <FormSelect
          name={"subClass"}
          label={"Sub Class"}
          data={classDetails?.subClasses}
          data_item_name={"name"}
          data_item_value={"_id"}
          formData={formData}
          handleChange={handleUserInputChange}
        />
      </Grid>

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
