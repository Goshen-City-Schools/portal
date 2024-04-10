import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";

import { Flex, useToast, Text } from "@chakra-ui/react";

import { deleteStudent } from "../../../api/student.api";

import { useUser } from "../../../app/contexts/UserContext";

import { useStudents } from "../../../hooks";

import Table from "../../../widgets/Table.widget";

import ActionsPopUp from "../../../widgets/ActionsPopUp";
import { IoMdEye } from "react-icons/io";

import { SchoolClass, RowId, FullName, UserId } from "../shared";

const StudentsTable = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { studentsData, setStudentsData } = useStudents();
  const { user } = useUser();

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

  const handleViewProfile = (studentId) => {
    navigate(`/admin/students/${studentId}`);
  };

  const handleEditAction = (studentId) => {
    navigate(`/admin/students/${studentId}/edit`);
  };

  const actionsMenu = (id) => [
    {
      name: "viewStudentProfile",
      label: "View Student Profile",
      action: "view",
      icon: <IoMdEye />,
      onClick: () => handleViewProfile(id),
    },
    {
      name: "editStudent",
      label: "Edit Student",
      action: "edit",
      icon: <MdEdit />,
      onClick: () => handleEditAction(id),
    },
    {
      name: "deleteStudent",
      label: "Delete Student",
      action: "delete",
      icon: <MdDelete />,
      onClick: () => handleDeleteAction(id),
    },
  ];

  const columns = [
    {
      Header: "SN",
      accessor: "sn",
      Cell: ({ row }) => <RowId row={row} />,
    },
    {
      Header: "Student ID",
      accessor: "studentId",
      Cell: ({ row, value }) => <UserId row={row} value={value} />,
    },
    {
      Header: "Full name",
      accessor: "first_name",
      Cell: ({ row }) => <FullName row={row} />,
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
      Cell: ({ value }) => <SchoolClass value={value} />,
    },

    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <ActionsPopUp
          menu={actionsMenu(row.original.studentId)}
          row={row}
          deleteAction={handleDeleteAction}
          viewAction={handleViewProfile}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={studentsData}
      fullWidthColumns={["Full Name", "Parent"]}
    />
  );
};

export default StudentsTable;
