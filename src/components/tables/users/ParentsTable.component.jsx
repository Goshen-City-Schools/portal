import React, { useState } from "react";
import Table from "../../../widgets/Table.widget";

import { Flex, Tooltip, useToast } from "@chakra-ui/react";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import IconComponent from "../../Icon.component";
import CustomCard from "../../CustomTooltip";
import { useNavigate } from "react-router-dom";
import { RowId } from "../shared";

const ParentsTable = ({ existingParentsData }) => {
  const toast = useToast();
  const navigate = useNavigate();

  const columns = [
    {
      Header: "S/N",
      accessor: "id",
      Cell: ({ row }) => <RowId row={row} />,
    },

    {
      Header: "Title",
      accessor: "title",
    },

    {
      Header: "Surname",
      accessor: "lastName",
    },
    {
      Header: "First Name",
      accessor: "firstName",
    },
    {
      Header: "No. of Wards",
      accessor: "No. of Ward",
      width: "max-content",
      Cell: ({ value }) => <p>{existingParentsData.length}</p>,
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Guardian Tel.",
      accessor: `telNumber`,
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <Flex gap={2}>
          <Tooltip label="delete" aria-label="New">
            <CustomCard>
              <IconComponent
                click={() => handleDeleteAction(row.original.id)}
                className="text-red-600 cursor-pointer hover:scale-110 transition duration-300"
              >
                <MdDeleteOutline size={20} />
              </IconComponent>
            </CustomCard>
          </Tooltip>

          <IconComponent
            className="text-green-700 cursor-pointer hover:scale-110 transition duration-300"
            click={() => handleEditAction(row.original.id)}
          >
            <MdModeEditOutline size={17} />
          </IconComponent>
        </Flex>
      ),
    },
  ];

  // const handleDeleteAction = (studentid) => {
  //   // Filter the student with the specified studentid

  //   const StudentDataToDelete = existingStudentsData.filter(
  //     (student) => student.id == studentid
  //   );

  //   if (
  //     window.confirm(
  //       `Are you sure to delete ${StudentDataToDelete[0].firstName}  ${StudentDataToDelete[0].lastName}?`
  //     )
  //   ) {
  //     const newStudentsData = existingStudentsData.filter(
  //       (student) => student.id == studentid
  //     ); // Update the state to re-render the component
  //     setStudentsData(newStudentsData);
  //     toast({
  //       title: `Deleted ${StudentDataToDelete[0].firstName}  ${StudentDataToDelete[0].lastName} of ${StudentDataToDelete[0].class} data!`,
  //       duration: "2000",
  //       status: "warning",
  //     });

  //     // Update localStorage
  //     localStorage.setItem("studentsData", JSON.stringify(newStudentsData));
  //   }
  // };

  const handleEditAction = () => {
    return;
  };

  return (
    <Table
      columns={columns}
      data={existingParentsData}
      fullWidthColumns={["Full Name", "Parent"]}
    />
  );
};

export default ParentsTable;
