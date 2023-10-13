import React from "react";
import Logo from "../Logo.component";
import "./SideMenu.style.css";

import { Box, List, Flex, Text } from "@chakra-ui/react";

import { TbSchool, TbReport } from "react-icons/tb";
import { BiLogOutCircle } from "react-icons/bi";
import { PiDotsNine } from "react-icons/pi";
import {
  MdOutlineBed,
  MdOutlineAssignment,
  MdOutlineSupportAgent,
  MdOutlinePrecisionManufacturing,
} from "react-icons/md";

import "./SideMenu.style.css";

import { useDispatch } from "react-redux";
import { logout } from "../../app/redux/slices/formSlice";
import { useNavigate } from "react-router-dom";
import IconComponent from "../Icon.component";
import NavItemComponent from "../NavItem.component";

export default function AdminSideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the logout action when the "Logout" button is clicked
    dispatch(logout());
    console.log("m");
    setTimeout(() => {
      navigate("/auth");
    }, 1000); // Adjust the delay as needed
  };

  return (
    <Box
      bg={"brand.900"}
      className="fixed top-0 text-sm left-0 h-screen max-w-[260px] w-full"
    >
      <Box
        position={"relative"}
        zIndex={50}
        className="sideBar-header h-max shadow-md flex items-center  w-full"
      >
        <Logo />
        <Flex direction={"column"} justifyContent={"center"}>
          <Text
            as={"p"}
            className="text-lg font-bold leading-tight"
            color={"neutral.100"}
          >
            GOSHEN CITY INTL.
          </Text>
          <Text
            as={"small"}
            color="neutral.300"
            className="text-[.7rem] font-bold uppercase"
          >
            Creche . Nursery . Primary
          </Text>
        </Flex>
      </Box>

      <Box className="pl-6 pr-4 py-6" color="neutral.100">
        <h3>MENU</h3>

        <List className="memuList pl-2">
          <NavItemComponent link={"/admin/home"}>
            <IconComponent>
              <PiDotsNine size={16} />
            </IconComponent>
            Dashboard
          </NavItemComponent>
          <NavItemComponent link={"/admin/students"}>
            <IconComponent>
              <MdOutlineAssignment size={18} />
            </IconComponent>
            Students
          </NavItemComponent>
          <NavItemComponent link={"/admin/staff"}>
            <IconComponent>
              <TbReport size={18} />
            </IconComponent>
            Staff
          </NavItemComponent>
          <NavItemComponent link={"/admin/classes"}>
            <IconComponent>
              <TbSchool size={18} />
            </IconComponent>
            Classes
          </NavItemComponent>
          <NavItemComponent link={"/admin/parents"}>
            <IconComponent>
              <MdOutlineBed size={18} />
            </IconComponent>
            Parents
          </NavItemComponent>
          <NavItemComponent link={"/admin/results"}>
            <IconComponent>
              <MdOutlineBed size={18} />
            </IconComponent>
            Results
          </NavItemComponent>
          <NavItemComponent link={"/admin/calendar"}>
            <IconComponent>
              <MdOutlineBed size={18} />
            </IconComponent>
            Calendar
          </NavItemComponent>
          <NavItemComponent link={"/admin/finance"}>
            <IconComponent>
              <MdOutlineBed size={18} />
            </IconComponent>
            Finance
          </NavItemComponent>
        </List>
      </Box>

      <Box className="pl-5 py-6" color="neutral.100">
        <h3>ACCOUNT</h3>
        <List className="memuList">
          {/*  */}
          <NavItemComponent link={"/admin/support"}>
            <IconComponent>
              <MdOutlineSupportAgent size={20} />
            </IconComponent>
            Help & Support
          </NavItemComponent>
          <NavItemComponent link={"/admin/login_history"}>
            <IconComponent>
              <MdOutlinePrecisionManufacturing size={20} />
            </IconComponent>
            Login History
          </NavItemComponent>
          <NavItemComponent link={"/admin/configuration"}>
            <IconComponent>
              <MdOutlinePrecisionManufacturing size={20} />
            </IconComponent>
            Configuration
          </NavItemComponent>
          <NavItemComponent onClick={handleLogout}>
            <IconComponent>
              <BiLogOutCircle size={20} />
            </IconComponent>
            Logout
          </NavItemComponent>
        </List>
      </Box>
    </Box>
  );
}
