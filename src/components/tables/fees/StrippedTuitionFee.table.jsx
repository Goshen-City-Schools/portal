import ActionsPopUp from "../../../widgets/ActionsPopUp";
import Table from "../../../widgets/Table.widget";

import { useFees } from "../../../hooks";

import RowId from "../shared/RowId";
import SchoolClass from "../shared/SchoolClass";
import PriceView from "../shared/PriceView";
x;

import { IoMdEye } from "react-icons/io";
import { MdEdit } from "react-icons/md";

import { useModal } from "../../../app/contexts/ModalContext";
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
      Header: "Full name",
      accessor: "name",
      Cell: ({ value }) => <SchoolClass value={value} />,
    },
    {
      Header: "Class",
      accessor: "classId",
      Cell: ({ value }) => <SchoolClass value={value} />,
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => <StatusBadge value={value} />,
    },
    {
      Header: "Balance",
      accessor: "balance",
      Cell: ({ value }) => <PriceView value={value} />,
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

  return <Table columns={columns} data={fees} fullWidthColumns={"Class"} />;
}
