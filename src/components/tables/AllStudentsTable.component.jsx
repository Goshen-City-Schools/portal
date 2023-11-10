import React, { useState, useEffect } from "react";
import Table from "../../widgets/Table.widget";
import { Flex, Tooltip, useToast } from "@chakra-ui/react";
import { MdDeleteOutline, MdLink, MdModeEditOutline } from "react-icons/md";
import IconComponent from "../Icon.component";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import CustomCard from "../CustomTooltip";

const AllStudentsTable = () => {
  const toast = useToast();
  const [studentsData, setStudentsData] = useState([]);
  const { setItem } = useLocalStorage("studentData");
  const navigate = useNavigate();
  const existingStudentsData = JSON.parse(localStorage.getItem("studentsData"));

  useEffect(() => {
    // Initialize studentsData with existingStudentsData
    setStudentsData(existingStudentsData);
  }, [existingStudentsData]);

  const columns = [
    {
      Header: "ID",
      accessor: "id",
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
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Class",
      accessor: "class",
      width: "max-content",
    },
    {
      Header: "Avatar",
      accessor: "avatar",
    },
    {
      Header: "Guardian Tel.",
      accessor: "guardianPhoneNumber",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <Flex gap={2}>
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

          <Tooltip label="Edit" hasArrow>
            <IconComponent
              className="text-green-700 cursor-pointer hover:scale-110 transition duration-300"
              click={() => handleEditAction(row.original.id)}
            >
              <MdLink size={18} />
            </IconComponent>
          </Tooltip>
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
