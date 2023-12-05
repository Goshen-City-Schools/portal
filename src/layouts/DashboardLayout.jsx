import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.component";

import { Box } from "@chakra-ui/react";
import ReactPortal from "../widgets/React_portal";

import SideBarLayout from "./SideBarLayout";
import { useUser } from "../app/contexts/UserContext";
// import Header from "../components/Header/Header.componentl";

export default function DashboardLayout() {
  const { user } = useUser();
  return (
    <div className="relative">
      <ReactPortal />

      <SideBarLayout />

      <Box
        marginLeft={{ base: "0px", md: "260px" }}
        as="main"
        w={{ base: "100%", md: "calc(100vw - 260px)" }}
        className="ml-[260px] overflow-x-hidden main"
      >
        {/* Header */}
        <Header />
        {/* {user?.accountType === "student" && <Header />} */}

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
