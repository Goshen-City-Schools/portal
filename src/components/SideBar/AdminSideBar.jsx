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
import { FaChevronRight, FaTimes } from "react-icons/fa";
import { toggleSideMenu } from "../../app/redux/slices/menuSlice";

export default function AdminSideBar({ sideBarView }) {
  const dispatch = useDispatch();

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

      <Box className="pl-4 pr-4 py-6" color="white">
        <h3>MENU</h3>

        <List className="memuList pl-1">
          <NavItemComponent onClick={handleToggleSideMenu} link={"/admin/home"}>
            <IconComponent>
              <PiDotsNine size={16} />
            </IconComponent>
            Dashboard
          </NavItemComponent>
          <NavItemComponent
            submenu={[
              { name: "All Students", link: "/admin/students" },
              { name: "Enrol New Student", link: "/admin/students/new" },
            ]}
          >
            <IconComponent>
              <MdOutlineAssignment size={18} />
            </IconComponent>
            Students
          </NavItemComponent>
          <NavItemComponent
            submenu={[
              { name: "All Staff", link: "/admin/staff" },
              { name: "New Staff Account", link: "/staff?type=academic" },
            ]}
          >
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
            submenu={[
              {
                name: "View Result",
                link: "/admin/results/view",
              },
              {
                name: "Result Sheet Settings",
                link: "/admin/results/settings",
              },
              {
                name: "Upload Results",
                link: "/admin/results/upload",
              },
              {
                name: "Results Broadsheet",
                link: "/admin/results",
              },
              {
                name: "Add / Del Features",
                link: "/admin/results",
              },
            ]}
          >
            <IconComponent>
              <MdOutlineBed size={18} />
            </IconComponent>
            Results
          </NavItemComponent>
          <NavItemComponent
            submenu={[
              { name: "Upcoming Events", link: "/admin" },
              { name: "Announcements", link: "/admin" },
            ]}
          >
            <IconComponent>
              <MdOutlineBed size={18} />
            </IconComponent>
            Calendar
          </NavItemComponent>
          <NavItemComponent
            submenu={[
              { name: "Examination", link: "/admin/cbt/examinations" },
              { name: "Assessment Tests", link: "/admin/cbt/assessments" },
            ]}
          >
            <IconComponent>
              <MdOutlineBed size={18} />
            </IconComponent>
            CBT
          </NavItemComponent>
          <NavItemComponent
            submenu={[
              { name: "All Transactions", link: "/admin/transactions" },
              { name: "Invoices", link: "/admin/transactions/" },
              { name: "Receipts", link: "/admin/transactions/tuition" },
            ]}
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

          <NavItemComponent link={"/admin/#"} click={sideBarView}>
            <IconComponent>
              <MdOutlinePrecisionManufacturing size={20} />
            </IconComponent>
            <Flex
              w={"full"}
              alignItems={"center"}
              justifyContent={"space-between"}
              pr={4}
            >
              Configuration <FaChevronRight />
            </Flex>
          </NavItemComponent>
        </List>
      </Box>
    </Box>
  );
}
