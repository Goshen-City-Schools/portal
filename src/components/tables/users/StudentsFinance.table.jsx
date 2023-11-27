import { useNavigate } from "react-router-dom";
import { MdInfo, MdReceipt, MdRememberMe } from "react-icons/md";

import { useToast } from "@chakra-ui/react";

import { deleteStudent } from "../../../api/student.api";

import { useUser } from "../../../app/contexts/UserContext";
import useStudents from "../../../hooks/useStudents";

import Table from "../../../widgets/Table.widget";
import ActionsPopUp from "../../../widgets/ActionsPopUp";

import RowId from "../shared/RowId";
import FullName from "../shared/FullName";
import PriceView from "../shared/PriceView";

export default function StudentsFinanceTable() {
  const toast = useToast();
  const navigate = useNavigate();
  const { studentsData, setStudentsData } = useStudents();
  const { user } = useUser();

  const actionsMenu = [
    {
      name: "generateInvoice",
      label: "Generate Invoice",
      action: "generateInvoice",
      icon: <MdReceipt />,
    },
    {
      name: "sendReminder",
      label: "Send Reminder",
      action: "sendReminder",

      icon: <MdRememberMe />,
    },
    {
      name: "contactGuardian",
      label: "Contact Guardian",
      action: "contact",

      icon: <MdInfo />,
    },
  ];

  const columns = [
    {
      Header: "SN",
      accessor: "sn",
      Cell: ({ row }) => <RowId row={row} />,
    },
    {
      Header: "Full name",
      accessor: "lastName",
      Cell: ({ row }) => <FullName row={row} />,
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
      Header: "Total Payable",
      accessor: "totalPayable",
      Cell: ({ value }) => {
        <PriceView color={"green"} value={value} />;
      },
    },
    {
      Header: "Total Paid",
      accessor: "totalPaid",
      Cell: ({ value }) => {
        <PriceView color={"orange"} value={value} />;
      },
    },
    {
      Header: "Balance",
      accessor: "allFeeBalance",
      Cell: ({ value }) => {
        <PriceView color={"red"} value={value} />;
      },
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <ActionsPopUp
          menu={actionsMenu()}
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
}
