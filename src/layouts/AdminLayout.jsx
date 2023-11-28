import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/SideBar/AdminSideBar";
import AdminHeader from "../components/Header/AdminHeader.component";

import { Box } from "@chakra-ui/react";
import ConfigurationSideBar from "../components/SideBar/ConfigurationSideBar";
import { useState } from "react";
import ReactPortal from "../widgets/React_portal";
import { useModal } from "../app/contexts/ModalContext";
import { useNavigate } from "react-router-dom";
import SearchUserForm from "../components/forms/SearchUserForm";
import CreateSubClassPortal from "../portals/CreateSubClass.portal";
import CreateEventPortal from "../portals/CreateEvent.portal";

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

    if (type === "event") return openPortal(<CreateEventPortal />);

    if (type === "createClass") return openPortal(<CreateSubClassPortal />);
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
