import ActionsPopUp from "../../../widgets/ActionsPopUp";
import Table from "../../../widgets/Table.widget";

import { useFees } from "../../../hooks";

import RowId from "../shared/RowId";
import SchoolClass from "../shared/SchoolClass";
import PriceView from "../shared/PriceView";

import { IoMdEye } from "react-icons/io";
import { MdEdit } from "react-icons/md";

import { useModal } from "../../../app/contexts/ModalContext";
import CreateTuitionFee from "../../../portals/fees/CreateTuitionFee";
import StatusBadge from "../shared/StatusBadge";

export default function TuitionFeeTable({ session, term, feeType }) {
  const { fees, setFees } = useFees(feeType, session, term);

  const { openPortal } = useModal();

  const handleEditAction = async (id) => {
    const existingData = fees.find((fee) => fee._id === id);
    console.log(id, fees, existingData);

    openPortal(
      <CreateTuitionFee
        action={"edit"}
        fees={fees}
        existingData={existingData}
      />
    );
  };

  const handleDeleteAction = async (feeId) => {
    if (
      window.confirm(`Are you sure to delete the tuition fee with ID ${feeId}?`)
    ) {
      try {
        const response = await axios.delete(`/api/v1/fees/tuition/${feeId}`);

        if (response.status === 200) {
          // Success: Subject deleted
          toast({
            title: `Deleted tution fee with ID ${feeId}`,
            duration: 2000,
            status: "warning",
          });

          // Update the local subjectsData state or refetch the data
          setFees((prevFeesData) =>
            prevFeesData.filter((subject) => subject._id !== feeId)
          );

          // Optionally, you can trigger a data refetch if needed
          // refetchData(); // Implement this function to refetch data from the server

          setInfoIsUpdated(true);
          return;
        } else {
          // Failure: Show an error toast
          toast({
            title: `Failed to delete subject with ID ${feeId}`,
            status: "error",
          });
        }
      } catch (error) {
        // Handle any unexpected errors
        console.error("Error deleting subject:", error.message);
        toast({
          title: "An error occurred while deleting the subject.",
          status: "error",
        });
      }
    }
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
        label: "Delete Fee",
        icon: <IoMdEye />,
        onClick: () => handleDeleteAction(id),
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
      accessor: "schoolClass",
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

  if (!fees)
    return (
      <Grid textAlign={"center"}>
        <Text as={"h2"}>
          "No tuition fee set for ${term} in ${session} session"
        </Text>
      </Grid>
    );

  return <Table columns={columns} data={fees} fullWidthColumns={"Class"} />;
}
