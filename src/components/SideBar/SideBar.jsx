import React from "react";
import Logo from "../Logo.component";

import { Box, List, ListItem, Flex, Text } from "@chakra-ui/react";

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
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/redux/slices/formSlice";
import { useNavigate } from "react-router-dom";
import NavItemComponent from "../NavItem.component";
import { toggleSideMenu } from "../../app/redux/slices/menuSlice";
import IconComponent from "../Icon.component";
import { FaTimes } from "react-icons/fa";

export default function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSideMenuOpen = useSelector((state) => state.menu.isSideMenuOpen);

  const handleToggleSideMenu = () => {
    dispatch(toggleSideMenu());
  };

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

      <Box className="pl-5 py-6" color="neutral.100">
        <Text as="h3" marginBottom={2}>
          MENU
        </Text>

        <List className="memuList">
          <NavItemComponent link={"/"}>
            <div className="icon h-6 w-6 flex items-center justify-center">
              <PiDotsNine size={16} />
            </div>
            Dashboard
          </NavItemComponent>
          <NavItemComponent
            submenu={[
              {
                name: "Invoices",
                link: "payments/invoices",
              },
              {
                name: "Receipts",
                link: "payments/Receipts",
              },
              {
                name: "Transaction History",
                link: "payments/history",
              },
            ]}
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlineAssignment size={18} />
            </div>
            My Payments
          </NavItemComponent>
          <NavItemComponent
            submenu={[
              {
                name: "Examination",
              },
              {
                name: "A-Tests",
              },
              {
                name: "Assignments",
              },
            ]}
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <TbReport size={18} />
            </div>
            Assessments
          </NavItemComponent>
          <NavItemComponent
            submenu={[
              {
                "name": "View Results",
                "link": "/",
              },
              {
                "name": "Print Result",
                "link": "/",
              },
            ]}
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <TbSchool size={18} />
            </div>
            My Results
          </NavItemComponent>

          <NavItemComponent
            submenu={[
              {
                "name": "Upcoming Events",
              },
              {
                "name": "Reminders",
              },
            ]}
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlineBed size={18} />
            </div>
            Announcements
          </NavItemComponent>
        </List>
      </Box>

      <Box className="pl-5 py-6" color="neutral.100">
        <Text as="h3" marginBottom={2}>
          ACCOUNT
        </Text>
        <List className="memuList">
          {/*  */}
          <ListItem
            roundedTopLeft={"md"}
            roundedBottomLeft={"md"}
            _hover={{ bg: "brand.700", color: " white", cursor: "pointer" }}
            className="flex justify-start px-6 py-3 gap-4 font-bold items-center"
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlineSupportAgent size={20} />
            </div>
            Help and Support
          </ListItem>
          <ListItem
            roundedTopLeft={"md"}
            roundedBottomLeft={"md"}
            _hover={{ bg: "brand.700", color: " white", cursor: "pointer" }}
            className="flex justify-start px-6 py-3 gap-4 font-bold items-center"
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlinePrecisionManufacturing size={20} />
            </div>
            Settings
          </ListItem>
          <ListItem
            roundedTopLeft={"md"}
            roundedBottomLeft={"md"}
            _hover={{ bg: "brand.700", color: " white", cursor: "pointer" }}
            className="flex justify-start px-6 py-3 gap-4 font-bold items-center"
            onClick={handleLogout}
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <BiLogOutCircle size={20} />
            </div>
            Logout
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
