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
  MdCancel,
} from "react-icons/md";

import "./SideMenu.style.css";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/redux/slices/formSlice";
import { useNavigate } from "react-router-dom";
import IconComponent from "../Icon.component";
import NavItemComponent from "../NavItem.component";
import { FaTimes } from "react-icons/fa";
import { toggleSideMenu } from "../../app/redux/slices/menuSlice";

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

  const isSideMenuOpen = useSelector((state) => state.menu.isSideMenuOpen);

  const handleToggleSideMenu = () => {
    dispatch(toggleSideMenu());
  };

  return (
    <Box
      bg={"brand.900"}
      width={{ "base": isSideMenuOpen ? "260px" : "0px", "md": "260px" }}
      position={"fixed"}
      top={0}
      fontSize={"sm"}
      zIndex={50}
      left={0}
      overflowY={"scroll"}
      height={"full"}
    >
      {/* Close Sidebar */}

      <Box
        position={"absolute"}
        top={"80px"}
        right={"0"}
        bg={"red.700"}
        color={"white"}
        h={10}
        w={10}
        rounded={"full"}
        zIndex={50}
        display={{ "base": "flex", "md": "none" }}
        justifyContent={"center"}
        alignItems={"center"}
        onClick={handleToggleSideMenu}
      >
        <IconComponent>
          <FaTimes size={20} />
        </IconComponent>
      </Box>

      <Box
        position={"relative"}
        zIndex={40}
        z
        className="sideBar-header h-max shadow-md flex items-center  w-full"
      >
        <Logo />
        <Flex
          direction={"column"}
          justifyContent={"center"}
          display={"sticky"}
          top={0}
        >
          <Text
            as={"p"}
            className="text-md font-bold leading-tight"
            color={"white"}
          >
            GOSHEN GROUP OF SCH.
          </Text>
          <Text
            as={"small"}
            color="whiteAlpha.800"
            className="text-[.7rem] font-bold uppercase"
          >
            Cre . Nur . Pri . Sec .
          </Text>
        </Flex>
      </Box>

      <Box className="pl-6 pr-4 py-6" color="white">
        <h3>MENU</h3>

        <List className="memuList pl-2">
          <NavItemComponent onClick={handleToggleSideMenu} link={"/admin/home"}>
            <IconComponent>
              <PiDotsNine size={16} />
            </IconComponent>
            Dashboard
          </NavItemComponent>
          <NavItemComponent
            link={"/admin/students"}
            onClick={handleToggleSideMenu}
          >
            <IconComponent>
              <MdOutlineAssignment size={18} />
            </IconComponent>
            Students
          </NavItemComponent>
          <NavItemComponent
            link={"/admin/staff"}
            onClick={handleToggleSideMenu}
          >
            <IconComponent>
              <TbReport size={18} />
            </IconComponent>
            Staff
          </NavItemComponent>
          <NavItemComponent
            link={"/admin/classes"}
            onClick={handleToggleSideMenu}
          >
            <IconComponent>
              <TbSchool size={18} />
            </IconComponent>
            Classes
          </NavItemComponent>
          <NavItemComponent
            link={"/admin/parents"}
            onClick={handleToggleSideMenu}
          >
            <IconComponent>
              <MdOutlineBed size={18} />
            </IconComponent>
            Parents
          </NavItemComponent>
          <NavItemComponent
            link={"/admin/results"}
            onClick={handleToggleSideMenu}
          >
            <IconComponent>
              <MdOutlineBed size={18} />
            </IconComponent>
            Results
          </NavItemComponent>
          <NavItemComponent
            link={"/admin/calendar"}
            onClick={handleToggleSideMenu}
          >
            <IconComponent>
              <MdOutlineBed size={18} />
            </IconComponent>
            Calendar
          </NavItemComponent>
          <NavItemComponent
            link={"/admin/finance"}
            onClick={handleToggleSideMenu}
          >
            <IconComponent>
              <MdOutlineBed size={18} />
            </IconComponent>
            Finance
          </NavItemComponent>
        </List>
      </Box>

      <Box className="pl-5 py-6" color="white">
        <h3>ACCOUNT</h3>
        <List className="memuList">
          {/*  */}
          <NavItemComponent
            link={"/admin/support"}
            onClick={handleToggleSideMenu}
          >
            <IconComponent>
              <MdOutlineSupportAgent size={20} />
            </IconComponent>
            Help & Support
          </NavItemComponent>
          <NavItemComponent
            link={"/admin/login_history"}
            onClick={handleToggleSideMenu}
          >
            <IconComponent>
              <MdOutlinePrecisionManufacturing size={20} />
            </IconComponent>
            Login History
          </NavItemComponent>
          <NavItemComponent
            link={"/admin/configuration"}
            onClick={handleToggleSideMenu}
          >
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
