import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/SideBar/AdminSideBar";
import AdminHeader from "../components/Header/AdminHeader.component";

import { Box } from "@chakra-ui/react";

export default function AdminLayout() {
  return (
    <div className="relative">
      <AdminSideBar />
      <Box
        marginLeft={{ "base": "0px", "lg": "260px" }}
        as="main"
        w={{ "base": "100%", "md": "calc(100vw - 260px)" }}
        className="ml-[260px] overflow-x-hidden"
      >
        <AdminHeader />
        <Outlet />
      </Box>
    </div>
  );
}
