import { useNavigate } from "react-router-dom";
import { MdDeleteOutline, MdLink } from "react-icons/md";

import { Flex, Tooltip, useToast, Text } from "@chakra-ui/react";

import { deleteStudent } from "../../api/student.api";

import { useUser } from "../../app/contexts/UserContext";

import useStudents from "../../hooks/useStudents";
import useClassDetails from "../../hooks/useClassDetails";

import Table from "../../widgets/Table.widget";

import CustomCard from "../CustomTooltip";
import IconComponent from "../Icon.component";

const AllStudentsTable = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { studentsData, setStudentsData } = useStudents();
  const { user } = useUser();

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
        const { classDetails, loading } = useClassDetails(value);

        return (
          <Flex gap={2}>
            <Text as={"p"} color={"neutral.700"}>
              {loading ? "Loading..." : classDetails?.name || ""}
            </Text>
          </Flex>
        );
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
        <Flex gap={2}>
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

          <CustomCard>
            <Tooltip label="Edit" hasArrow>
              <IconComponent
                className="text-green-700 cursor-pointer hover:scale-110 transition duration-300"
                click={() => handleEditAction(row.original.portalId)}
              >
                <MdLink size={18} />
              </IconComponent>
            </Tooltip>
          </CustomCard>
        </Flex>
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

export default AllStudentsTable;
