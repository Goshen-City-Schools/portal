import { useNavigate } from "react-router-dom";
import React from "react";
import DataTable from "../../widgets/Table.widget";
import { RowId, SchoolClass } from "./shared";
import { useSubjects } from "../../hooks/Subjects";

import { Flex, Tag, useToast } from "@chakra-ui/react";
import ActionsPopUp from "../../widgets/ActionsPopUp";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "../../api/axios";
import { useUser } from "../../app/contexts/UserContext";

const SubjectTable = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { subjectsData, setSubjectsData } = useSubjects();
  const { setInfoIsUpdated } = useUser();

  const handleEditAction = async (id) => {
    return navigate(`/admin/config/subjects/${id}/edit`);
  };

  const handleDeleteAction = async (subjectId) => {
    if (
      window.confirm(`Are you sure to delete the subject with ID ${subjectId}?`)
    ) {
      try {
        const response = await axios.delete(`/api/v1/subjects/${subjectId}`);

        if (response.status === 200) {
          // Success: Subject deleted
          toast({
            title: `Deleted subject with ID ${subjectId}`,
            duration: 2000,
            status: "warning",
          });

          // Update the local subjectsData state or refetch the data
          setSubjectsData((prevSubjectsData) =>
            prevSubjectsData.filter((subject) => subject._id !== subjectId)
          );

          // Optionally, you can trigger a data refetch if needed
          // refetchData(); // Implement this function to refetch data from the server

          setInfoIsUpdated(true);
          return;
        } else {
          // Failure: Show an error toast
          toast({
            title: `Failed to delete subject with ID ${subjectId}`,
            status: "error",
          });
        }
      } catch (error) {
        // Handle any unexpected errors
        console.error("Error deleting subject:", error.message);
        toast({
          title: "An error occurred while deleting the subject.",
          status: "error",
        });
      }
    }
  };

  const actionsMenu = (id) => [
    {
      name: "editSubject",
      label: "Edit Subject",
      icon: <MdEdit />,
      onClick: () => handleEditAction(id),
    },
    {
      name: "deleteSubject",
      label: "Delete Subject",
      icon: <MdDelete />,
      onClick: () => handleDeleteAction(id),
    },
  ];

  // Define the columns for the SubjectTable
  const columns = React.useMemo(
    () => [
      {
        Header: "S/N", // Serial Number
        accessor: "sn",
        Cell: ({ row }) => <RowId row={row} />,
      },
      {
        Header: "Subject", // Serial Number
        accessor: "name",
      },
      {
        Header: "Classes",
        accessor: "classes",
        Cell: ({ value }) => (
          <Flex gap={2} overflowX={"hidden"} wrap={"wrap"}>
            {value?.map((id, index) => (
              <Tag colorScheme="facebook" size={"sm"}>
                <SchoolClass value={id} />
              </Tag>
            ))}
          </Flex>
        ),
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <ActionsPopUp menu={actionsMenu(row.original._id)} />
        ),
      },
    ],
    []
  );

  return (
    <DataTable
      columns={columns}
      data={subjectsData}
      fullWidthColumns={["Classes"]}
    />
  );
};

export default SubjectTable;
