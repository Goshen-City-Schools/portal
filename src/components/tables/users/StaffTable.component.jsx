import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Table from "../../../widgets/Table.widget";
import { useToast } from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";

import { useEffect } from "react";
import { useUser } from "../../../app/contexts/UserContext";
import { deleteStaff } from "../../../api/staff.api";

import { RowId, FullName, UserId, TagInTable } from "../shared";

import ActionsPopUp from "../../../widgets/ActionsPopUp";
import { IoMdEye } from "react-icons/io";

const StaffTable = ({ existingStaffData }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useUser();
  const [staffData, setStaffData] = useState(existingStaffData);

  useEffect(() => {
    // Your logic to handle staffData change
    setStaffData(existingStaffData);
  }, [existingStaffData]);

  const handleDeleteAction = async (staffId) => {
    if (user.portalId === staffId) {
      // Prevent staff from deleting themselves
      return toast({
        title: "You cannot delete yourself.",
        status: "warning",
      });
    } else if (
      window.confirm(`Are you sure to delete the staff with ID ${staffId}?`)
    ) {
      try {
        // Use the deleteStaff function to delete the staff member
        const deletedStaff = await deleteStaff(staffId);

        // Check if the delete operation was successful
        if (deletedStaff) {
          // Filter the staff member with the specified staffId and update the state
          const newStaffData = staffData.filter(
            (staff) => staff?.portalId !== staffId
          );
          setStaffData(newStaffData);

          // Show a toast notification
          toast({
            title: `Deleted staff with ID ${staffId}`,
            duration: 2000,
            status: "warning",
          });
        } else {
          // Show an error toast if the delete operation was not successful
          toast({
            title: `Failed to delete staff with ID ${staffId}`,
            status: "error",
          });
        }
      } catch (error) {
        // Handle any error that occurred during the deleteStaff function
        console.error("Error deleting staff:", error.message);
        toast({
          title: "An error occurred while deleting the staff.",
          status: "error",
        });
      }
    }
  };

  const handleViewProfile = (staffId) => {
    navigate(`/admin/staff/${staffId}`);
  };

  const handleEditAction = (staffId) => {
    navigate(`/admin/config/staff/${staffId}/edit`);
  };

  const actionsMenu = (id) => [
    {
      name: "viewStaffProfile",
      label: "View Staff Profile",
      action: "view",
      icon: <IoMdEye />,
      onClick: () => handleViewProfile(id),
    },
    {
      name: "editStaff",
      label: "Edit Staff",
      action: "edit",
      icon: <MdEdit />,
      onClick: () => handleEditAction(id),
    },
    {
      name: "deleteStaff",
      label: "Delete Staff",
      action: "delete",
      icon: <MdDelete />,
      onClick: () => handleDeleteAction(id),
    },
  ];

  const columns = React.useMemo(() => [
    {
      Header: "SN",
      accessor: "id",
      Cell: ({ row }) => <RowId row={row} />,
    },
    {
      Header: "Staff ID",
      accessor: "username",
      Cell: ({ value, row }) => (
        <UserId row={row} type={"staff"} value={value} />
      ),
    },

    {
      Header: "Full Name",
      accessor: "name",
      Cell: ({ row }) => (
        <Text as={"p"} textTransform={"capitalize"}>
          {row.original.name}
        </Text>
      ),
    },

    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Phone Number",
      accessor: "telNumber",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <ActionsPopUp menu={actionsMenu(row.original.username)} row={row} />
      ),
    },
  ]);

  return (
    <Table
      columns={columns}
      data={staffData ? staffData : []}
      fullWidthColumns={["Full Name", "Email"]}
    />
  );
};

export default StaffTable;
