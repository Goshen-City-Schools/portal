import React from "react";

import { Stack, FormLabel, Switch, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { FormInput } from "../shared";
import { useMemo } from "react";
import { RowId } from "../tables/shared";
import { useClasses } from "../../hooks";
import DataTable from "../../widgets/Table.widget";
import { handleInputChange } from "../../helpers/handleInputChange";
import { useCallback } from "react";
import axios from "../../api/axios";
import { useUser } from "../../app/contexts/UserContext";
import { useNavigate } from "react-router-dom";

const SwitchCell = React.memo(({ onChange, classId, isChecked }) => {
  const handleSwitchChange = () => {
    onChange(!isChecked);
  };

  return <Switch isChecked={isChecked} onChange={handleSwitchChange} />;
});

export default function SubjectForm({ subjectData, action }) {
  const { name, classes: initialClasses } = subjectData || {};
  const { setInfoIsUpdated } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: name || "",
    classes: initialClasses || [],
  });
  const { schoolClasses } = useClasses();
  const toast = useToast();

  const handleSwitchChange = useCallback(
    (classId) => (isChecked) => {
      setFormData((prevFormData) => {
        const updatedClasses = isChecked
          ? [...prevFormData.classes, classId]
          : prevFormData.classes.filter((id) => id !== classId);

        const newFormData = { ...prevFormData, classes: updatedClasses };

        // Log the updated state once the state update is complete

        return newFormData;
      });
    },
    []
  );

  const handleSetSubject = async () => {
    try {
      const { name, classes } = formData;
      const response = await axios.post("/api/v1/subjects", {
        name,
        classes,
      });

      if (response.data) {
        toast({
          position: "top-right",
          title: "Subject created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setInfoIsUpdated(true);
        navigate("/admin/config/academics");
        return;
        // Clear the form or perform any other necessary actions
      } else {
        console.error(
          "Error setting subject:",
          response.data ? response.data.error : "Unknown error"
        );
        // Handle the error response
        toast({
          position: "top-right",
          title: "Error creating subject",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    } catch (error) {
      console.error("Error setting subject:", error.message);
      // Handle any unexpected errors
      toast({
        position: "top-right",
        title: "Error creating subject",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSwitchChangeMemoized = useCallback(
    (classId) => (isChecked) => {
      handleSwitchChange(classId)(isChecked);
    },
    [handleSwitchChange]
  );

  const handleChange = useCallback((e) => {
    handleInputChange(e, setFormData);
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: "SN",
        accessor: "id",
        Cell: ({ row }) => <RowId row={row} />,
      },
      {
        Header: "Classes",
        accessor: "name",
      },
      {
        Header: "Status",
        accessor: "status", // Assuming _id is the unique identifier for each row
        Cell: ({ row }) => (
          <SwitchCell
            classId={row?.original._id}
            isChecked={formData.classes.includes(row?.original._id)}
            onChange={handleSwitchChangeMemoized(row?.original._id)}
          />
        ),
      },
    ],
    [formData.classes]
  );

  return (
    <Stack my={4} pb={4}>
      <FormInput
        handleChange={handleChange}
        label={"Subject name"}
        name={"name"}
        data={formData}
        disabled={action === "edit"}
      />

      <Stack mt={4}>
        <FormLabel fontSize={"sm"} fontWeight={"bold"}>
          Classes
        </FormLabel>

        <DataTable
          fullWidthColumns={"Classes"}
          columns={columns}
          data={schoolClasses}
        />
      </Stack>

      <Button
        onClick={handleSetSubject}
        mt={4}
        mx={"auto"}
        fontSize={"sm"}
        colorScheme="facebook"
      >
        {action === "edit" ? "Update Subject" : "Create Subject"}
      </Button>
    </Stack>
  );
}
