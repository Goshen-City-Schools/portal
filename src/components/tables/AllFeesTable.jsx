import { useNavigate } from "react-router-dom";

import schoolData from "../../data/school.data";

import useStaffs from "../../hooks/useStaffs";

import Table from "../../widgets/Table.widget";

import { Flex, useToast, Text, Tag } from "@chakra-ui/react";
import { MdEdit, MdRemoveRedEye } from "react-icons/md";
import ActionsPopUp from "../../widgets/ActionsPopUp";
import RowId from "./shared/RowId";

export default function AllFeesTable() {
  const toast = useToast();
  const navigate = useNavigate();

  const { staffsData: staffData } = useStaffs();

  const actionsMenu = [
    {
      name: "editFeeDetails",
      label: "Edit Details",
      icon: <MdEdit />,
    },
    {
      name: "deactivateFeeType",
      label: "Deactivate Fee",
      icon: <MdRemoveRedEye />,
    },
  ];

  const columns = [
    {
      Header: "SN",
      accessor: "id",
      Cell: ({ row }) => <RowId row={row} />,
    },
    {
      Header: "Fee Type",
      accessor: "name",
    },
    {
      Header: "Configuration Data",
      accessor: "configData ",
      Cell: ({ value }) => (
        <Flex gap={2} overflowX={"hidden"} wrap={"wrap"}>
          {value?.map((priviledge, index) => (
            <Tag
              flexShrink={0}
              size="sm"
              key={index}
              variant="outline"
              fontWeight={"semibold"}
              colorScheme="orange"
            >
              {priviledge}
            </Tag>
          ))}
        </Flex>
      ),
    },
    {
      Header: "Account Type",
      accessor: "accountType",
      Cell: ({ value }) => (
        <Flex gap={2} overflowX={"hidden"} wrap={"wrap"}>
          {value?.map((priviledge, index) => (
            <Tag
              flexShrink={0}
              size="sm"
              key={index}
              variant="outline"
              fontWeight={"semibold"}
              colorScheme="orange"
            >
              {priviledge}
            </Tag>
          ))}
        </Flex>
      ),
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({}) => <ActionsPopUp menu={actionsMenu} />,
    },
  ];

  const handleFeeDeactivation = (FeeId) => {
    if (
      window.confirm(`Are you sure to delete the staff with ID ${staffId}?`)
    ) {
    }
  };

  return (
    <Table
      columns={columns}
      data={schoolData.staffRoles}
      fullWidthColumns={["Configuration Data"]}
    />
  );
}
