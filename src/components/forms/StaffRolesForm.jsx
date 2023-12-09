import React from "react";
import { FormInput, FormSelect, FormcContainer } from "../shared";
import { useState } from "react";
import { useStaffRoles } from "../../hooks";
import { RowId } from "../tables/shared";

export default function StaffRolesForm({ roleData, action }) {
  const { staffRolesData } = useStaffRoles();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: roleData?.name || "",
    description: roleData?.description || "",
    staff: roleData?.staff || [],
  });

  const handleChange = (e) => {
    e.preventDefault();
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (!formData.name) {
      toast({
        status: "error",
        position: "top-right",
        title: "Role name is required!",
        duration: 2000,
      });
      setLoading(false);
      return;
    }

    const staffData = {
      name: formData.name,
    };

    // Simulating Backend Actions
    if (allowedUserRoles(user, ["IT Personnel"])) {
      try {
        // Make an API request to register the staff
        const response = await axios.post(
          "/api/v1/staff/roles",
          JSON.stringify(staffData),
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log(response);

        // Check the response status and handle accordingly
        if (response.status === 201) {
          setLoading(false);
          toast({
            status: "success",
            position: "top-right",
            title: "Role Successfully Created!",
            duration: 2000,
          });

          setTimeout(() => {
            openPortal(
              <AccountCreatedScreen
                type={"staff"}
                data={response.data.user}
                email={staffData.email}
              />
            );
          }, 1000);
          navigate("/admin/staff/roles");

          // Additional actions after successful registration
        } else {
          setLoading(false);
          toast({
            status: "error",
            position: "top-right",
            title: "Registration failed!",
            duration: 2000,
          });
        }
      } catch (error) {
        console.error("Registration failed:", error.message);
        setLoading(false);
        toast({
          status: "error",
          position: "top-right",
          title: "Registration failed!",
          duration: 2000,
        });
      }
    } else {
      // Simulate data from Backend API
      setTimeout(() => {
        setLoading(false);
        toast({
          status: "error",
          position: "top-right",
          title: "no-access!",
          duration: 2000,
        });
      }, 2000);
    }

    // Clears form data
    setFormData({
      firstName: "",
      lastName: "",
      primaryRole: "",
      dateOfBirth: "",
      gender: "",
      email: "",
      phoneNumber: "",
      whatsappNumber: "",
    });
  }
  const columns = useMemo(
    () => [
      {
        Header: "SN",
        accessor: "id",
        Cell: ({ row }) => <RowId row={row} />,
      },
      {
        Header: "Staff",
        accessor: "name",
      },
      {
        Header: "Status",
        accessor: "status", // Assuming _id is the unique identifier for each row
        Cell: ({ row }) => (
          <SwitchCell
            classId={row?.original._id}
            isChecked={formData.classes.includes(row?.original._id)}
            onChange={handleSwitchChangeMemoized(row?.original._id)}
          />
        ),
      },
    ],
    [formData.classes]
  );

  return (
    <FormcContainer>
      <FormSelect
        formData={formData}
        handleChange={handleChange}
        data={staffRolesData}
        data_item_value={"_id"}
        data_item_name={"name"}
        name={"name"}
        label={"Role Name"}
        disabled={action === "edit"}
      />
    </FormcContainer>
  );
}
