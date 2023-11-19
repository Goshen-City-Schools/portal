import React, { useState } from "react";
import Table from "../../widgets/Table.widget";
import { Flex, Tooltip, useToast } from "@chakra-ui/react";
import IconComponent from "../Icon.component";
import { MdDeleteOutline, MdLink } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { Text, Tag } from "@chakra-ui/react";
import CustomCard from "../CustomTooltip";
import { useEffect } from "react";
import { useUser } from "../../app/contexts/UserContext";

const AllStaffTable = ({ existingStaffData }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useUser();
  const [staffData, setStaffData] = useState(existingStaffData);

  useEffect(() => {
    // Your logic to handle staffData change
    setStaffData(existingStaffData);
  }, [existingStaffData]);

  const columns = React.useMemo(() => [
    {
      Header: "SN",
      accessor: "id",
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
      Header: "Staff ID",
      accessor: "portalId",
      Cell: ({ value }) => (
        <Flex gap={2}>
          <Text
            as={"p"}
            color={"neutral.700"}
            letterSpacing={0.5}
            textTransform={"uppercase"}
          >
            GSHN/STF/{value}
          </Text>
        </Flex>
      ),
    },
    {
      Header: "Full Name",
      accessor: "firstName",
      Cell: ({ row }) => (
        <Flex gap={2}>
          <Text as={"p"} textTransform={"capitalize"}>
            {row.original.firstName} {row.original.lastName}
          </Text>
        </Flex>
      ),
    },
    ,
    {
      Header: "Phone Number",
      accessor: "phoneNumber",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <Flex gap={2}>
          {user?.portalId !== row.original.portalId && ( // Check if the logged-in staff is not the one being deleted
            <CustomCard>
              <Tooltip label="Delete" hasArrow>
                <IconComponent
                  click={() => handleDeleteAction(row.original.portalId)}
                  className="text-red-600 cursor-pointer hover:scale-110 transition duration-300"
                >
                  <MdDeleteOutline size={20} />
                </IconComponent>
              </Tooltip>
            </CustomCard>
          )}

          <Tooltip label="Edit" hasArrow>
            <IconComponent
              className="text-green-700 cursor-pointer hover:scale-110 transition duration-300"
              click={() => handleLink(row.original.portalId)}
            >
              <MdLink size={18} />
            </IconComponent>
          </Tooltip>
        </Flex>
      ),
    },
  ]);

  const handleDeleteAction = (staffId) => {
    if (user.poralId === staffId) {
      // Prevent staff from deleting themselves
      toast({
        title: "You cannot delete yourself.",
        status: "warning",
      });
    } else if (
      window.confirm(`Are you sure to delete the staff with ID ${staffId}?`)
    ) {
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

      // Update localStorage
      localStorage.setItem("staffData", JSON.stringify(newStaffData));
    }
  };

  const handleLink = (staffId) => {
    navigate(`/admin/staff/${staffId}`);
  };

  return (
    <Table
      columns={columns}
      data={staffData ? staffData : []}
      fullWidthColumns={["Roles", "Parent"]}
    />
  );
};

export default AllStaffTable;
