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
  MdAdd,
  MdEdit,
  MdEditDocument,
  MdOutlineMail,
  MdWhatsapp,
  MdOutlineChat,
  MdHistory,
  MdOutlineBroadcastOnPersonal,
  MdAccessible,
} from "react-icons/md";

import { BsEye } from "react-icons/bs";

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

          {/* Students Navigation */}
          <NavItemComponent
            submenu={[
              {
                name: "View Student",
                link: "/admin/students",
                icon: <MdEditDocument size={12} />,
              },
              {
                name: "Manage Students",
                link: "/admin/students",
                icon: <MdEditDocument size={12} />,
              },
              {
                name: "Register New Student",
                link: "/staff?type=academic",
                icon: <MdAdd size={14} />,
              },
            ]}
          >
            <IconComponent>
              <MdOutlineAssignment size={18} />
            </IconComponent>
            Students
          </NavItemComponent>

          {/* Staff Navigation */}

          <NavItemComponent
            submenu={[
              {
                name: "View Staff",
                link: `/admin/staff/#`,
                onClick: () => {
                  alert("cliek");
                },
                icon: <MdEditDocument size={12} />,
              },
              {
                name: "Manage Staff",
                link: "/admin/staff",
                icon: <MdEditDocument size={12} />,
              },
              {
                name: "Register New Staff",
                link: "/admin/staff/new",
                icon: <MdAdd size={14} />,
              },
              {
                name: "Manage Priviledges",
                link: "/staff?type=academic",
                icon: <MdAccessible size={14} />,
              },
            ]}
          >
            <IconComponent>
              <TbReport size={18} />
            </IconComponent>
            Staff
          </NavItemComponent>

          {/* Classes Navigation */}
          <NavItemComponent
            submenu={[
              {
                name: "Manage Classes",
                link: "/admin/classes",
                icon: <MdEditDocument size={12} />,
              },
              {
                name: "Create New Clsss",
                link: "/staff?type=academic",
                icon: <MdAdd size={14} />,
              },
            ]}
          >
            <IconComponent>
              <TbSchool size={18} />
            </IconComponent>
            Classes
          </NavItemComponent>

          <NavItemComponent
            submenu={[
              {
                name: "View Results",
                link: "/admin/students",
                icon: <BsEye size={12} />,
              },
              {
                name: "Manage Results",
                link: "/admin/students",
                icon: <MdOutlineChat size={12} />,
              },
              {
                name: "Results Broadsheet",
                link: "/staff?type=academic",
                icon: <MdOutlineMail size={14} />,
              },
              {
                name: "Upload Result",
                link: "/admin/students",
                icon: <MdWhatsapp size={12} />,
              },
              {
                name: "Set Results Format",
                link: "/staff?type=academic",
                icon: <MdOutlineBroadcastOnPersonal size={14} />,
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
              {
                name: "Manage Events",
                link: "/admin/students",
                icon: <BsEye size={12} />,
              },
              {
                name: "Create new event",
                link: "/admin/students",
                icon: <MdOutlineChat size={12} />,
              },
              {
                name: "Send Invite",
                link: "/staff?type=academic",
                icon: <MdOutlineMail size={14} />,
              },
            ]}
          >
            <IconComponent>
              <MdOutlineBed size={18} />
            </IconComponent>
            Calendar
          </NavItemComponent>

          {/* CBT */}
          {/* <NavItemComponent
            submenu={[
              { name: "Examination", link: "/admin/cbt/examinations" },
              { name: "Assessment Tests", link: "/admin/cbt/assessments" },
            ]}
          >
            <IconComponent>
              <MdOutlineBed size={18} />
            </IconComponent>
            CBT
          </NavItemComponent> */}

          {/* Communication */}
          <NavItemComponent
            submenu={[
              {
                name: "Start chat",
                link: "/admin/students",
                icon: <MdOutlineChat size={12} />,
              },
              {
                name: "Send Email",
                link: "/staff?type=academic",
                icon: <MdOutlineMail size={14} />,
              },
              {
                name: "Send Whatsapp",
                link: "/admin/students",
                icon: <MdWhatsapp size={12} />,
              },
              {
                name: "Broadcast Message",
                link: "/staff?type=academic",
                icon: <MdOutlineBroadcastOnPersonal size={14} />,
              },
            ]}
          >
            <IconComponent>
              <MdOutlineBed size={18} />
            </IconComponent>
            Communication
          </NavItemComponent>
          {/* Finance */}

          <NavItemComponent
            submenu={[
              {
                name: "Transacttion History",
                link: "/admin/students",
                icon: <MdHistory color={"white"} size={12} />,
              },
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
