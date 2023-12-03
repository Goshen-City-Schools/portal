import React from "react";

import { useDispatch, useSelector } from "react-redux";

import "./SideMenu.style.css";

import { toggleSideMenu } from "../../app/redux/slices/menuSlice";
import { useUser } from "../../app/contexts/UserContext";
import allowedUserRoles from "../../helpers/allowedUserRoles";

import { Box, List, Flex, Text, VStack } from "@chakra-ui/react";

import { TbFolderSearch } from "react-icons/tb";
import { RiParentLine } from "react-icons/ri";
import { PiChalkboardTeacherDuotone, PiDotsNine } from "react-icons/pi";
import { FaChevronRight, FaTimes } from "react-icons/fa";
import {
  MdOutlineBed,
  MdOutlineSupportAgent,
  MdOutlinePrecisionManufacturing,
  MdAdd,
  MdEditDocument,
  MdOutlineMail,
  MdWhatsapp,
  MdOutlineChat,
  MdHistory,
  MdOutlineBroadcastOnPersonal,
  MdAccessible,
  MdSettings,
  MdSubject,
} from "react-icons/md";

import { PiStudentDuotone } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { LuCalendarDays } from "react-icons/lu";
import { BiSpreadsheet } from "react-icons/bi";
import { TbMessages } from "react-icons/tb";

import IconComponent from "../Icon.component";
import NavItemComponent from "../NavItem.component";
import Logo from "../Logo.component";
import Avatar from "../Avatar.component";

export default function AdminSideBar({ sideBarView, handleClick }) {
  const dispatch = useDispatch();
  const { user } = useUser();
  const isSideMenuOpen = useSelector((state) => state.menu.isSideMenuOpen);

  const handleToggleSideMenu = () => {
    dispatch(toggleSideMenu());
  };

  return (
    <Box
      as="aside"
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
        <IconComponent color={"warning.200"}>
          <FaTimes size={20} />
        </IconComponent>
      </Box>

      <Box
        position={"relative"}
        zIndex={40}
        py={2}
        className="sideBar-header h-max shadow-sm flex items-center  w-full"
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
            className="text-md mt-1 font-bold leading-tight"
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

      <VStack>
        <VStack mt={4}>
          <Avatar
            height={108}
            width={108}
            imageUrl={user.avatarImageURL ? user.avatarImageURL : "/avatar.png"}
          />
        </VStack>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"start"}
          w={"full"}
          className="pl-4 pr-4 py-6"
          color="white"
        >
          <h3>MENU</h3>

          <List className="memuList pl-1" w={"full"}>
            <NavItemComponent
              onClick={handleToggleSideMenu}
              link={"/admin/home"}
            >
              <IconComponent color={"warning.200"}>
                <PiDotsNine size={16} />
              </IconComponent>
              Dashboard
            </NavItemComponent>
            {}
            {/* Students Navigation */}
            {allowedUserRoles(user, [
              "IT Personnel",
              "School Teacher",
              "Bursar",
            ]) && (
              <NavItemComponent
                submenu={[
                  {
                    name: "View Student",
                    link: "/admin/students",
                    onClick: () => handleClick("student"),
                    icon: <TbFolderSearch size={12} />,
                  },
                  {
                    name: "Manage Students",
                    link: "/admin/students",
                    icon: <MdEditDocument size={12} />,
                  },
                  {
                    name: "Register New Student",
                    link: "/admin/students/new",
                    icon: <MdAdd size={14} />,
                    roles: ["IT Personnel"],
                  },
                ]}
              >
                <IconComponent color={"warning.200"}>
                  <PiStudentDuotone size={18} />
                </IconComponent>
                Students
              </NavItemComponent>
            )}

            {allowedUserRoles(user, ["IT Personnel", "Class Teacher"]) && (
              <NavItemComponent
                submenu={[
                  {
                    name: "Manage Parents",
                    link: "/admin/parents",
                    icon: <MdEditDocument size={12} />,
                  },
                  {
                    link: "/admin/parents",
                    name: "Add Parent",
                    icon: <MdAdd size={14} />,
                    roles: ["IT Personnel"],
                    onClick: () => handleClick("createClass"),
                  },
                ]}
              >
                <IconComponent color={"warning.200"}>
                  <RiParentLine size={18} />
                </IconComponent>
                Parents
              </NavItemComponent>
            )}
            {/* Staff Navigation */}
            {allowedUserRoles(user, ["IT Personnel"]) && (
              <NavItemComponent
                submenu={[
                  {
                    name: "View Staff",
                    link: `/admin/staff`,
                    onClick: () => handleClick("staff"),
                    icon: <TbFolderSearch size={12} />,
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
                    name: "Manage Roles",
                    link: "/admin/staff/roles",
                    icon: <MdAccessible size={14} />,
                  },
                ]}
              >
                <IconComponent color={"warning.200"}>
                  <PiChalkboardTeacherDuotone size={18} />
                </IconComponent>
                Staff
              </NavItemComponent>
            )}

            {allowedUserRoles(user, ["IT Personnel", "Class Teacher"]) && (
              <NavItemComponent
                submenu={[
                  {
                    name: "Manage Subjects",
                    link: "/admin/subjects",
                    icon: <MdEditDocument size={12} />,
                  },
                  {
                    link: "/admin/subjects",
                    name: "Add New Subject",
                    icon: <MdAdd size={14} />,
                    roles: ["IT Personnel"],
                    onClick: () => handleClick("createSubject"),
                  },
                ]}
              >
                <IconComponent color={"warning.200"}>
                  <MdSubject size={18} />
                </IconComponent>
                Subjects
              </NavItemComponent>
            )}
            {/* Classes Navigation */}

            {allowedUserRoles(user, ["IT Personnel", "Class Teacher"]) && (
              <NavItemComponent
                submenu={[
                  {
                    name: "Manage Classes",
                    link: "/admin/classes",
                    icon: <MdEditDocument size={12} />,
                  },
                  {
                    link: "/admin/classes",
                    name: "Create Sub-class",
                    icon: <MdAdd size={14} />,
                    roles: ["IT Personnel"],
                    onClick: () => handleClick("createClass"),
                  },
                ]}
              >
                <IconComponent color={"warning.200"}>
                  <SiGoogleclassroom size={18} />
                </IconComponent>
                Classes
              </NavItemComponent>
            )}

            {/* Results */}
            {allowedUserRoles(user, [
              "IT Personnel",
              "School Teacher",
              "Class Teacher",
            ]) && (
              <NavItemComponent
                submenu={[
                  {
                    name: "Add Class Result",
                    link: "/admin/students",
                    icon: <MdWhatsapp size={12} />,
                    roles: ["IT Personnel"],
                  },
                  {
                    name: "Manage Results",
                    link: "/admin/students",
                    icon: <MdOutlineChat size={12} />,
                  },
                  {
                    name: "View Broadsheet",
                    link: "/staff?type=academic",
                    icon: <MdOutlineMail size={14} />,
                  },

                  {
                    name: "Set Result Format",
                    link: "/staff?type=academic",
                    icon: <MdOutlineBroadcastOnPersonal size={14} />,
                    roles: ["IT Personnel", "Principal"],
                  },
                ]}
              >
                <IconComponent color={"warning.200"}>
                  <BiSpreadsheet size={18} />
                </IconComponent>
                Results
              </NavItemComponent>
            )}

            {/* Finance */}

            {allowedUserRoles(user, ["Principal", "Bursar"]) && (
              <NavItemComponent
                submenu={[
                  {
                    name: "All Fees",
                    link: "/admin/finance/fees",
                    icon: <MdHistory color={"white"} size={12} />,
                  },
                  {
                    name: "Transacttion History",
                    link: "/admin/transactions",
                    icon: <MdHistory color={"white"} size={12} />,
                  },
                  {
                    name: "School Expenditure",
                    link: "/admin/finance/expenses",
                    icon: <MdHistory color={"white"} size={12} />,
                  },
                  {
                    name: "Configure",
                    link: "/admin/finance",
                    icon: <MdSettings color={"white"} size={12} />,
                  },
                ]}
              >
                <IconComponent color={"warning.200"}>
                  <MdOutlineBed size={18} />
                </IconComponent>
                Finance
              </NavItemComponent>
            )}

            {/* Events */}
            <NavItemComponent
              submenu={[
                {
                  name: "View Events",
                  link: "/admin/events",
                  icon: <TbFolderSearch size={12} />,
                },
                {
                  name: "Create new event",
                  link: "/admin/events",
                  icon: <MdOutlineChat size={12} />,
                  roles: ["IT Personnel"],
                  onClick: () => handleClick("event"),
                },
                {
                  name: "Send Invite",
                  link: "/admin/events",
                  icon: <MdOutlineMail size={14} />,
                  roles: ["IT Personnel"],
                  onClick: () => alert("feature updates..."),
                },
              ]}
            >
              <IconComponent color={"warning.200"}>
                <LuCalendarDays size={18} />
              </IconComponent>
              Calendar
            </NavItemComponent>

            {/* Communication */}
            {allowedUserRoles(user, ["IT Personnel", "Principal"]) && (
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
                <IconComponent color={"warning.200"}>
                  <TbMessages size={18} />
                </IconComponent>
                Communication
              </NavItemComponent>
            )}
          </List>
        </Box>
      </VStack>

      <Box className="pl-5 pb-6 pt-4" color="white">
        <h3>ACCOUNT</h3>
        <List className="memuList">
          {/*  */}
          <NavItemComponent
            link={"/admin/support"}
            onClick={handleToggleSideMenu}
          >
            <IconComponent color={"warning.200"}>
              <MdOutlineSupportAgent size={20} />
            </IconComponent>
            Help & Support
          </NavItemComponent>
          <NavItemComponent
            link={"/admin/login_history"}
            onClick={handleToggleSideMenu}
          >
            <IconComponent color={"warning.200"}>
              <MdOutlinePrecisionManufacturing size={20} />
            </IconComponent>
            Login History
          </NavItemComponent>

          {allowedUserRoles(user, ["IT Personnel", "Principal"]) && (
            <NavItemComponent link={"/admin/#"} click={sideBarView}>
              <IconComponent color={"warning.200"}>
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
          )}
        </List>
      </Box>
    </Box>
  );
}
