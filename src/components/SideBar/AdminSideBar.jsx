import React from "react";
import Logo from "../Logo.component";
import "./SideMenu.style.css";

import { Box, List, Flex, Text, ListItem } from "@chakra-ui/react";

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

import { useDispatch } from "react-redux";
import { logout } from "../../app/redux/slices/formSlice";
import { useNavigate } from "react-router-dom";

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

      <Box className="pl-5 py-6" color="neutral.100">
        <h3>MENU</h3>

        <List className="memuList">
          <ListItem
            roundedTopLeft={"md"}
            roundedBottomLeft={"md"}
            _hover={{ bg: "brand.700", color: " white", cursor: "pointer" }}
            className="flex px-6 py-3 gap-4 justify-start font-bold items-center"
            marginTop={"0"}
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <PiDotsNine size={16} />
            </div>
            Dashboard
          </ListItem>
          <ListItem
            roundedTopLeft={"md"}
            roundedBottomLeft={"md"}
            _hover={{ bg: "brand.700", color: " white", cursor: "pointer" }}
            className="flex px-6 py-3 gap-4 justify-start font-bold items-center"
            marginTop={"0"}
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlineAssignment size={18} />
            </div>
            Students
          </ListItem>
          <ListItem
            roundedTopLeft={"md"}
            roundedBottomLeft={"md"}
            _hover={{ bg: "brand.700", color: " white", cursor: "pointer" }}
            className="flex px-6 py-3 gap-4 justify-start font-bold items-center"
            marginTop={"0"}
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <TbReport size={18} />
            </div>
            Staff
          </ListItem>{" "}
          <ListItem>
            <Link
              to={"/fees/invoices"}
              className="flex px-6 py-3 gap-4 justify-start font-bold items-center"
            >
              <div className="icon h-6 w-6 flex items-center justify-center">
                <TbSchool size={18} />
              </div>
              Classes
            </Link>
          </ListItem>
          <ListItem
            roundedTopLeft={"md"}
            roundedBottomLeft={"md"}
            _hover={{ bg: "brand.700", color: " white", cursor: "pointer" }}
            className="flex px-6 py-3 gap-4 justify-start font-bold items-center"
            marginTop={"0"}
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlineBed size={18} />
            </div>
            Parents
          </ListItem>
          <ListItem
            roundedTopLeft={"md"}
            roundedBottomLeft={"md"}
            _hover={{ bg: "brand.700", color: " white", cursor: "pointer" }}
            className="flex px-6 py-3 gap-4 justify-start font-bold items-center"
            marginTop={"0"}
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlineBed size={18} />
            </div>
            Results
          </ListItem>
          <ListItem
            roundedTopLeft={"md"}
            roundedBottomLeft={"md"}
            _hover={{ bg: "brand.700", color: " white", cursor: "pointer" }}
            className="flex px-6 py-3 gap-4 justify-start font-bold items-center"
            marginTop={"0"}
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlineBed size={18} />
            </div>
            Calendar
          </ListItem>
          <ListItem
            roundedTopLeft={"md"}
            roundedBottomLeft={"md"}
            _hover={{ bg: "brand.700", color: " white", cursor: "pointer" }}
            className="flex px-6 py-3 gap-4 justify-start font-bold items-center"
            marginTop={"0"}
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlineBed size={18} />
            </div>
            Finance
          </ListItem>
        </List>
      </Box>

      <Box className="pl-5 py-6" color="neutral.100">
        <h3>ACCOUNT</h3>
        <List className="memuList">
          {/*  */}
          <ListItem
            roundedTopLeft={"md"}
            roundedBottomLeft={"md"}
            _hover={{ bg: "brand.700", color: " white", cursor: "pointer" }}
            className="flex px-6 py-3 gap-4 justify-start font-bold items-center"
            marginTop={"0"}
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
            className="flex px-6 py-3 gap-4 justify-start font-bold items-center"
            marginTop={"0"}
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
            className="flex px-6 py-3 gap-4 justify-start font-bold items-center"
            marginTop={"0"}
            onClick={handleLogout}
          >
            <div className="icon h-6 w-6 flex items-center justify-center">
              <BiLogOutCircle size={20} />
            </div>
            Logout
          </ListItem>
        </List>{" "}
      </Box>
    </Box>
  );
}
