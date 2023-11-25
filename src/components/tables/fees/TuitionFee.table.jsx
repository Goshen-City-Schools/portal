import ActionsPopUp from "../../../widgets/ActionsPopUp";
import Table from "../../../widgets/Table.widget";

import useFees from "../../../hooks/Fees";

import RowId from "../shared/RowId";
import SchoolClass from "../shared/SchoolClass";
import PriceView from "../shared/PriceView";

import { IoMdEye } from "react-icons/io";
import { MdEdit } from "react-icons/md";

import { Badge } from "@chakra-ui/react";

import { Button, Flex } from "@chakra-ui/react";
import { useModal } from "../../../app/contexts/ModalContext";
import CreateTuitionFee from "../../../portals/fees/CreateTuitionFee";

export default function TuitionFeeTable() {
  const { fees } = useFees("tuition");

  const { openPortal } = useModal();

  const actionsMenu = [
    {
      name: "editTuitionFee",
      label: "Edit Fee",
      icon: <MdEdit />,
    },
    {
      name: "disableTuitionFee",
      label: "Disable Fee",
      icon: <IoMdEye />,
    },
  ];

  const columns = [
    {
      Header: "SN",
      accessor: "id",
      Cell: ({ row }) => <RowId row={row} />,
    },
    {
      Header: "Class",
      accessor: "classId",
      Cell: ({ value }) => <SchoolClass value={value} />,
    },
    {
      Header: "New Student",
      accessor: "price.new",
      Cell: ({ value }) => <PriceView value={value} />,
    },
    {
      Header: "Existing Student",
      accessor: "price.existing",
      Cell: ({ value }) => <PriceView value={value} />,
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => <StatusBadge value={value} />,
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({}) => <ActionsPopUp menu={actionsMenu} />,
    },
  ];

  if (!fees) return "No account set currently!";

  return (
    <>
      <Flex w={"full"} justifyContent={"flex-end"} mb={4}>
        <Button
          size={"sm"}
          colorScheme="blue"
          variant={"outline"}
          onClick={() => {
            openPortal(<CreateTuitionFee />);
          }}
        >
          Add Tuition Fee
        </Button>
      </Flex>

      <Table columns={columns} data={fees} fullWidthColumns={"Class"} />
    </>
  );
}
