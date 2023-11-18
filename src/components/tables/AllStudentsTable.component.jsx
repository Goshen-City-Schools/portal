import React, { useState, useEffect } from "react";
import Table from "../../widgets/Table.widget";
import { Flex, Tooltip, useToast, Text } from "@chakra-ui/react";
import { MdDeleteOutline, MdLink, MdModeEditOutline } from "react-icons/md";
import IconComponent from "../Icon.component";
import { useNavigate } from "react-router-dom";
import CustomCard from "../CustomTooltip";

const AllStudentsTable = ({ existingStudentsData }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    // Initialize studentsData with existingStudentsData
    setStudentsData(existingStudentsData);
  }, [existingStudentsData]);

  const columns = [
    {
      Header: "SN",
      accessor: "sn",
      Cell: ({ row }) => (
        <Text
          as={"p"}
          color={"neutral.700"}
          textTransform={"uppercase"}
          letterSpacing={0.5}
          fontWeight={"semibold"}
        >
          {row.index + 1}
        </Text>
      ),
    },
    {
      Header: "Student ID",
      accessor: "portalId",
      Cell: ({ value }) => (
        <Flex gap={2}>
          <Text
            as={"p"}
            color={"neutral.700"}
            textTransform={"uppercase"}
            letterSpacing={0.5}
            fontWeight={"semibold"}
          >
            GSHN/STU/{value}
          </Text>
        </Flex>
      ),
    },
    {
      Header: "Full name",
      accessor: "lastName",
      Cell: ({ row }) => (
        <Flex gap={2}>
          <Text as={"p"} textTransform={"capitalize"}>
            {row.original.firstName} {row.original.lastName}
          </Text>
        </Flex>
      ),
    },

    {
      Header: "Gender",
      accessor: "gender",
      Cell: ({ value }) => (
        <Flex gap={2}>
          <Text as={"p"} textTransform={"capitalize"} color={"neutral.700"}>
            {value}
          </Text>
        </Flex>
      ),
    },
    {
      Header: "Class",
      accessor: "schoolClass",
      width: "max-content",
    },
    {
      Header: "Guardian Tel.",
      accessor: "guardianPhoneNumber",
    },
    {
      Header: "Guardian Email",
      accessor: "guardianEmail",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <Flex gap={2}>
          {console.log(row.index)}
          <CustomCard>
            <Tooltip label="Delete" hasArrow>
              <IconComponent
                click={() => handleDeleteAction(row.original.id)}
                className="text-red-600 cursor-pointer hover:scale-110 transition duration-300"
              >
                <MdDeleteOutline size={20} />
              </IconComponent>
            </Tooltip>
          </CustomCard>

          <CustomCard>
            <Tooltip label="Edit" hasArrow>
              <IconComponent
                className="text-green-700 cursor-pointer hover:scale-110 transition duration-300"
                click={() => handleEditAction(row.original.portalId)}
              >
                <MdLink size={18} />
              </IconComponent>
            </Tooltip>
          </CustomCard>
        </Flex>
      ),
    },
  ];

  const handleDeleteAction = (studentId) => {
    if (
      window.confirm(`Are you sure to delete the student with ID ${studentId}?`)
    ) {
      // Filter the student with the specified studentId and update the state
      const newStudentsData = studentsData.filter(
        (student) => student.id !== studentId
      );
      setStudentsData(newStudentsData);

      // Show a toast notification
      toast({
        title: `Deleted student with ID ${studentId}`,
        duration: 2000,
        status: "warning",
      });

      // Update localStorage
      localStorage.setItem("studentsData", JSON.stringify(newStudentsData));
    }
  };

  const handleEditAction = (studentId) => {
    // Navigate to the edit student page
    navigate(`/admin/students/${studentId}`);
  };

  return (
    <Table
      columns={columns}
      data={studentsData}
      fullWidthColumns={["Full Name", "Parent"]}
    />
  );
};

export default AllStudentsTable;
