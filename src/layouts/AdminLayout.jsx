import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/SideBar/AdminSideBar";
import AdminHeader from "../components/Header/AdminHeader.component";

import { Box } from "@chakra-ui/react";
import ConfigurationSideBar from "../components/SideBar/ConfigurationSideBar";
import { useState } from "react";
import ReactPortal from "../widgets/ReactPortal";
import { useModal } from "../app/contexts/ModalContext";
import { useNavigate } from "react-router-dom";
import SchoolClassForm from "../components/forms/SchoolClassForm";
import SearchUserForm from "../components/forms/SearchUserForm";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { openPortal, closePortal } = useModal();
  const [showAdminSidebar, setShowAdminSidebar] = useState(true);

  const handleStaffSearch = (staffId) => {
    navigate(`/admin/staff/${staffId}`);
    closePortal();
  };

  const handleStudentSearch = (studentId) => {
    navigate(`/admin/students/${studentId}`);
    closePortal();
  };

  const handleClick = (type) => {
    if (type === "staff")
      return openPortal(
        <SearchUserForm
          accountType={"staff"}
          handleSubmit={handleStaffSearch}
        />
      );
    if (type === "student")
      return openPortal(
        <SearchUserForm
          accountType={"student"}
          handleSubmit={handleStudentSearch}
        />
      );

    if (type === "createClass") return openPortal(<SchoolClassForm />);
  };

  const toggleSidebar = () => {
    setShowAdminSidebar(!showAdminSidebar);
  };

  return (
    <div className="relative">
      <ReactPortal />
      <>
        {showAdminSidebar ? (
          <AdminSideBar sideBarView={toggleSidebar} handleClick={handleClick} />
        ) : (
          <ConfigurationSideBar sideBarView={toggleSidebar} />
        )}
      </>
      <Box
        marginLeft={{ base: "0px", md: "260px" }}
        as="main"
        w={{ base: "100%", md: "calc(100vw - 260px)" }}
        className="ml-[260px] overflow-x-hidden main"
      >
        <AdminHeader />
        <Outlet />
      </Box>

      <style>
        {`
      @media print {
        main{
          margin-left: 0;
        }
      }
    `}
      </style>
    </div>
  );
}
