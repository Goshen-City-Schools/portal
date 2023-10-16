import React from "react";
import Logo from "../Logo.component";
import "./SideMenu.style.css";

import { Box, List, Flex, Text } from "@chakra-ui/react";

import { TbSchool, TbReport } from "react-icons/tb";
import { PiDotsNine } from "react-icons/pi";
import {
  MdOutlineBed,
  MdOutlineAssignment,
  MdOutlineSupportAgent,
  MdOutlinePrecisionManufacturing,
} from "react-icons/md";

import "./SideMenu.style.css";

import { useDispatch, useSelector } from "react-redux";

import IconComponent from "../Icon.component";
import NavItemComponent from "../NavItem.component";
import { FaTimes } from "react-icons/fa";
import { toggleSideMenu } from "../../app/redux/slices/menuSlice";

export default function ConfigurationSideBar() {
  const dispatch = useDispatch();

  const isSideMenuOpen = useSelector((state) => state.menu.isSideMenuOpen);

  const handleToggleSideMenu = () => {
    dispatch(toggleSideMenu());
  };

  return (
    <Box
      bg={"brand.900"}
      width={{ "accent.900": isSideMenuOpen ? "260px" : "0px", "md": "260px" }}
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
        position={"relative"}
        zIndex={40}
        h={20}
        bg={"white"}
        className="sideBar-header shadow-md flex items-center  w-full"
      >
        <Text
          as={"p"}
          className="text-md font-bold leading-tight"
          color={"white"}
        >
          Configuration
        </Text>
      </Box>

      <Box className="pl-4 pr-4 py-6" color="white">
        <h3>GENERAL</h3>

        <List className="memuList pl-1">
          <NavItemComponent onClick={handleToggleSideMenu} link={"/admin/home"}>
            <IconComponent>
              <PiDotsNine size={16} />
            </IconComponent>
            School Details
          </NavItemComponent>
          <NavItemComponent
            submenu={[
              "All Students",
              "Reception",
              "Nursery",
              "Basic",
              "Secondary",
            ]}
          >
            <IconComponent>
              <MdOutlineAssignment size={18} />
            </IconComponent>
            Students
          </NavItemComponent>
          <NavItemComponent
            submenu={["All Staff", "Academic Staff", "Non-Academic Staff"]}
          >
            <IconComponent>
              <TbReport size={18} />
            </IconComponent>
            Staff
          </NavItemComponent>
          <NavItemComponent
            submenu={["Time table", "Academic Staff", "Non-Academic Staff"]}
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
            submenu={["Submenu Item 1", "Submenu Item 2", "Submenu Item 3"]}
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
            submenu={["Submenu Item 1", "Submenu Item 2", "Submenu Item 3"]}
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
            submenu={["Sc", "Submenu Item 2", "Submenu Item 3"]}
          >
            <IconComponent>
              <MdOutlinePrecisionManufacturing size={20} />
            </IconComponent>
            Configuration
          </NavItemComponent>
        </List>
      </Box>
    </Box>
  );
}
