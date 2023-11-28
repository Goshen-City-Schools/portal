import ActionsPopUp from "../../../widgets/ActionsPopUp";
import Table from "../../../widgets/Table.widget";

import useFees from "../../../hooks/Fees";

import RowId from "../shared/RowId";
import SchoolClass from "../shared/SchoolClass";
import PriceView from "../shared/PriceView";

import { IoMdEye } from "react-icons/io";
import { MdEdit } from "react-icons/md";

import { Button, Flex } from "@chakra-ui/react";
import { useModal } from "../../../app/contexts/ModalContext";
import CreateTuitionFee from "../../../portals/fees/CreateTuitionFee";
import StatusBadge from "../shared/StatusBadge";
import TuitionFeeForm from "../../forms/fees/TuitionFeeForm";

export default function TuitionFeeTable() {
  const { fees } = useFees("tuition");

  const { openPortal } = useModal();

  const handleEditAction = async (id) => {
    openPortal(<TuitionFeeForm action={"edit"} feeTypeId={id} />);
  };

  const actionsMenu = (id) => {
    return [
      {
        name: "editTuitionFee",
        label: "Edit Fee",
        icon: <MdEdit />,
        action: "edit",
        onClick: () => handleEditAction(id),
      },
      {
        name: "disableTuitionFee",
        label: "Disable Fee",
        icon: <IoMdEye />,
      },
    ];
  };

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
      Cell: ({ row }) => {
        return <ActionsPopUp menu={actionsMenu(row.original._id)} row={row} />;
      },
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
