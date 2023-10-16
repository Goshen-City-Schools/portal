import React from "react";
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

export default function ConfigurationSideBar({ sideBarView }) {
  const dispatch = useDispatch();

  const isSideMenuOpen = useSelector((state) => state.menu.isSideMenuOpen);

  const handleToggleSideMenu = () => {
    dispatch(toggleSideMenu());
  };

  return (
    <Box
      bg={"accent.900"}
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
        position={"relative"}
        zIndex={40}
        h={20}
        bg={"white"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        className=" items-center  w-full"
        pl={8}
        pr={4}
        borderRight={"2px"}
        borderStyle={"solid"}
        borderColor={"accent.900"}
      >
        <Text
          as={"p"}
          className="text-md font-bold leading-tight"
          color={"black"}
        >
          Configuration
        </Text>

        <Flex
          h={8}
          w={8}
          bg={"gray.200"}
          rounded={"full"}
          justifyContent={"center"}
          alignItems={"center"}
          onClick={() => sideBarView()}
        >
          <FaTimes />
        </Flex>
      </Box>

      <Box className="pl-4 pr-4 py-6" color="whiteAlpha.800">
        <h3 className="mb-3">GENERAL</h3>

        <List className="memuList pl-1">
          <NavItemComponent
            onClick={handleToggleSideMenu}
            link={"/admin/config/school-info"}
          >
            <IconComponent>
              <PiDotsNine size={16} />
            </IconComponent>
            School Details
          </NavItemComponent>
          <NavItemComponent link={"/admin/config/students"}>
            <IconComponent>
              <MdOutlineAssignment size={18} />
            </IconComponent>
            Students
          </NavItemComponent>
          <NavItemComponent link={"/admin/config/session"}>
            <IconComponent>
              <TbReport size={18} />
            </IconComponent>
            Session & Term
          </NavItemComponent>
          <NavItemComponent link={"/admin/config/classes"}>
            <IconComponent>
              <TbSchool size={18} />
            </IconComponent>
            Classes
          </NavItemComponent>
          <NavItemComponent link={"/admin/config/sub-classes"}>
            <IconComponent>
              <MdOutlineBed size={18} />
            </IconComponent>
            SubClasses
          </NavItemComponent>
          <NavItemComponent link={"/admin/config/results"}>
            <IconComponent>
              <MdOutlineBed size={18} />
            </IconComponent>
            Subjects
          </NavItemComponent>
          <NavItemComponent link={"/admin/config/results"}>
            <IconComponent>
              <MdOutlineBed size={18} />
            </IconComponent>
            Notification
          </NavItemComponent>
        </List>
      </Box>

      <Box className="pl-5 py-6" color="whiteAlpha.800">
        <h3 className="mb-3">FINANCE</h3>
        <List className="memuList">
          {/*  */}
          <NavItemComponent
            link={"/admin/support"}
            onClick={handleToggleSideMenu}
          >
            <IconComponent>
              <MdOutlineSupportAgent size={20} />
            </IconComponent>
            Payment
          </NavItemComponent>
          <NavItemComponent
            link={"/admin/login_history"}
            onClick={handleToggleSideMenu}
          >
            <IconComponent>
              <MdOutlinePrecisionManufacturing size={20} />
            </IconComponent>
            Fees
          </NavItemComponent>
        </List>
      </Box>
    </Box>
  );
}
