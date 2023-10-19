import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/SideBar/AdminSideBar";
import AdminHeader from "../components/Header/AdminHeader.component";

import { Box } from "@chakra-ui/react";
import ConfigurationSideBar from "../components/SideBar/ConfigurationSideBar";
import { useState } from "react";

export default function AdminLayout() {
  const [showAdminSidebar, setShowAdminSidebar] = useState(true);

  const toggleSidebar = () => {
    console.log("d");
    setShowAdminSidebar(!showAdminSidebar);
  };

  return (
    <div className="relative">
      <>
        {showAdminSidebar ? (
          <AdminSideBar sideBarView={toggleSidebar} />
        ) : (
          <ConfigurationSideBar sideBarView={toggleSidebar} />
        )}
      </>
      <Box
        marginLeft={{ "base": "0px", "lg": "260px" }}
        as="main"
        w={{ "base": "100%", "md": "calc(100vw - 260px)" }}
        className="ml-[260px] overflow-x-hidden main"
      >
        <AdminHeader />
        <Outlet />
      </Box>

      <style>
        {`
      @media print {
        main{
          margin-left:0;
        }
      }
    `}
      </style>
    </div>
  );
}
