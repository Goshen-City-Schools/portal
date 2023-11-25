import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";

import { Flex, useToast, Text } from "@chakra-ui/react";

import { deleteStudent } from "../../../api/student.api";

import { useUser } from "../../../app/contexts/UserContext";

import useStudents from "../../../hooks/useStudents";

import Table from "../../../widgets/Table.widget";

import ActionsPopUp from "../../../widgets/ActionsPopUp";
import { IoMdEye } from "react-icons/io";
import SchoolClass from "../shared/SchoolClass";

const StudentsTable = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { studentsData, setStudentsData } = useStudents();
  const { user } = useUser();

  const actionsMenu = [
    {
      name: "viewStudentProfile",
      label: "View Student Profile",
      action: "view",
      icon: <IoMdEye />,
    },
    {
      name: "editStudent",
      label: "Edit Student",
      action: "edit",

      icon: <MdEdit />,
    },
    {
      name: "deleteStudent",
      label: "Delete Student",
      action: "delete",

      icon: <MdDelete />,
    },
  ];

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
      Cell: ({ value }) => {
        <SchoolClass value={value} />;
      },
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
        <ActionsPopUp
          menu={actionsMenu}
          row={row}
          deleteAction={handleDeleteAction}
          viewAction={handleLink}
        />
      ),
    },
  ];

  const handleDeleteAction = async (studentId) => {
    if (user.portalId === studentId) {
      // Prevent student from deleting themselves
      return toast({
        title: "You cannot delete yourself.",
        status: "warning",
      });
    } else if (
      window.confirm(`Are you sure to delete the student with ID ${studentId}?`)
    ) {
      try {
        // Use the deleteStaff function to delete the student member
        const deletedStudent = await deleteStudent(studentId);

        // Check if the delete operation was successful
        if (deletedStudent) {
          // Filter the student member with the specified studentId and update the state
          const newStudentsData = studentsData.filter(
            (student) => student?.portalId !== studentId
          );
          setStudentsData(newStudentsData);

          // Show a toast notification
          toast({
            title: `Deleted student with ID ${studentId}`,
            duration: 2000,
            status: "warning",
          });
        } else {
          // Show an error toast if the delete operation was not successful
          toast({
            title: `Failed to delete student with ID ${studentId}`,
            status: "error",
          });
        }
      } catch (error) {
        // Handle any error that occurred during the deleteStaff function
        console.error("Error deleting student:", error.message);
        toast({
          title: "An error occurred while deleting the student.",
          status: "error",
        });
      }
    }
  };

  const handleLink = (studentId) => {
    navigate(`/admin/students/${studentId}`);
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

export default StudentsTable;
