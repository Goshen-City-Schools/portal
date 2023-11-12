import React from "react";
import Logo from "../Logo.component";
import "./SideMenu.style.css";

import { Box, List, Flex, Text, VStack } from "@chakra-ui/react";

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
import { useUser } from "../../app/contexts/UserContext";
import allowedUserRoles from "../../helpers/allowedUserRoles";
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
          <Avatar height={108} width={108} imageUrl={"/avatar.png"} />
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
              <IconComponent>
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
                    icon: <MdEditDocument size={12} />,
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
                <IconComponent>
                  <MdOutlineAssignment size={18} />
                </IconComponent>
                Students
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
                    name: "Manage Roles",
                    link: "/admin/staff/roles",
                    icon: <MdAccessible size={14} />,
                  },
                ]}
              >
                <IconComponent>
                  <TbReport size={18} />
                </IconComponent>
                Staff
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
                    name: "Create Sub-class",
                    link: "/staff/classes?type=academic",
                    icon: <MdAdd size={14} />,
                    roles: ["IT Personnel"],
                  },
                ]}
              >
                <IconComponent>
                  <TbSchool size={18} />
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
                    roles: ["IT Personnel"],
                  },
                  {
                    name: "Set Results Format",
                    link: "/staff?type=academic",
                    icon: <MdOutlineBroadcastOnPersonal size={14} />,
                    roles: ["IT Personnel", "Principal"],
                  },
                ]}
              >
                <IconComponent>
                  <MdOutlineBed size={18} />
                </IconComponent>
                Results
              </NavItemComponent>
            )}

            {/* Finance */}

            {allowedUserRoles(user, ["Principal", "Bursar"]) && (
              <NavItemComponent
                submenu={[
                  {
                    name: "Transacttion History",
                    link: "/admin/transactions",
                    icon: <MdHistory color={"white"} size={12} />,
                  },
                  {
                    name: "Manage Fees",
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
            )}

            {/* Events */}
            <NavItemComponent
              submenu={[
                {
                  name: "View Events",
                  link: "/admin/students",
                  icon: <BsEye size={12} />,
                },
                {
                  name: "Create new event",
                  link: "/admin/students",
                  icon: <MdOutlineChat size={12} />,
                  roles: ["IT Personnel"],
                },
                {
                  name: "Send Invite",
                  link: "/staff?type=academic",
                  icon: <MdOutlineMail size={14} />,
                  roles: ["IT Personnel"],
                },
              ]}
            >
              <IconComponent>
                <MdOutlineBed size={18} />
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
                <IconComponent>
                  <MdOutlineBed size={18} />
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

          {allowedUserRoles(user, ["IT Personnel", "Principal"]) && (
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
          )}
        </List>
      </Box>
    </Box>
  );
}
