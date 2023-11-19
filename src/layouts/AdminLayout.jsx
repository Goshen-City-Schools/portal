import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/SideBar/AdminSideBar";
import AdminHeader from "../components/Header/AdminHeader.component";

import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import ConfigurationSideBar from "../components/SideBar/ConfigurationSideBar";
import { useState } from "react";
import ReactPortal from "../widgets/ReactPortal";
import { useModal } from "../app/contexts/ModalContext";
import { useNavigate } from "react-router-dom";
import CreateNewClassForm from "../components/forms/CreateNewClassForm";
import { useUser } from "../app/contexts/UserContext";
import { useEffect } from "react";

const ViewStaffForm = ({ handleSubmit }) => {
  const staffIdRef = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(staffIdRef.current.value);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FormControl>
        <FormLabel fontSize={"sm"} fontWeight={"bold"}>
          Enter Staff ID:
        </FormLabel>
        <Input type="text" ref={staffIdRef} />
      </FormControl>
      <Button mb={4} fontSize={"sm"} colorScheme={"blue"} type="submit">
        View Staff Profile
      </Button>
    </form>
  );
};

//
const ViewStudentForm = ({ handleSubmit }) => {
  const studentIdRef = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(studentIdRef.current.value);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FormControl>
        <FormLabel fontSize={"sm"} fontWeight={"bold"}>
          Enter Student ID:
        </FormLabel>
        <Input type="text" ref={studentIdRef} />
      </FormControl>
      <Button mb={4} fontSize={"sm"} colorScheme={"blue"} type="submit">
        View Student Profile
      </Button>
    </form>
  );
};

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
      return openPortal(<ViewStaffForm handleSubmit={handleStaffSearch} />);
    if (type === "student")
      return openPortal(<ViewStudentForm handleSubmit={handleStudentSearch} />);

    if (type === "createClass") return openPortal(<CreateNewClassForm />);
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
