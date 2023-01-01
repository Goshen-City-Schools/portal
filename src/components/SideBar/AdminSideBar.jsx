import React from "react";

import allowedUserRoles from "../../helpers/allowedUserRoles";

import { List } from "@chakra-ui/react";

import { TbFolderSearch } from "react-icons/tb";
import { RiParentLine } from "react-icons/ri";
import { PiDotsNine } from "react-icons/pi";

import {
  MdOutlineBed,
  MdAdd,
  MdEditDocument,
  MdOutlineMail,
  MdWhatsapp,
  MdOutlineChat,
  MdHistory,
  MdOutlineBroadcastOnPersonal,
} from "react-icons/md";

import { PiStudentDuotone } from "react-icons/pi";
import { LuCalendarDays } from "react-icons/lu";
import { BiSpreadsheet } from "react-icons/bi";
import { TbMessages } from "react-icons/tb";

import IconComponent from "../Icon.component";
import NavItemComponent from "../NavItem.component";
import {
  AddSubjectPortal,
  CreateEventPortal,
  CreateSubClassPortal,
} from "../../portals";
import { useModal } from "../../app/contexts/ModalContext";

export const AdminSideBarList = ({ user, handleToggleSideMenu }) => {
  const { openPortal } = useModal();
  const handleClick = (type) => {
    if (type === "event") return openPortal(<CreateEventPortal />);
    if (type === "createSubject") return openPortal(<AddSubjectPortal />);
    if (type === "createClass") return openPortal(<CreateSubClassPortal />);
  };

  console.log(user);

  return (
    <List className="memuList pl-1" w={"full"}>
      <NavItemComponent onClick={handleToggleSideMenu} link={"/admin/home"}>
        <IconComponent color={"warning.200"}>
          <PiDotsNine size={16} />
        </IconComponent>
        Dashboard
      </NavItemComponent>

      {/* Students Navigation */}
      {allowedUserRoles(user, [
        "495420506572736f6e6e656c",
        "IT Personnel",
        "School Teacher",
        "Bursar",
      ]) && (
        <NavItemComponent
          submenu={[
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

      {/* Parents Navigation */}
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
            },
          ]}
        >
          <IconComponent color={"warning.200"}>
            <RiParentLine size={18} />
          </IconComponent>
          Parents
        </NavItemComponent>
      )}

      {/* Performance */}
      {allowedUserRoles(user, [
        "IT Personnel",
        "Subject Teacher",
        "Class Teacher",
      ]) && (
        <NavItemComponent
          submenu={[
            {
              name: "Manage Results",
              link: "/admin/results",
              icon: <MdOutlineChat size={12} />,
            },
            {
              name: "Attendance Report",
              link: "/admin/results/new",
              icon: <MdWhatsapp size={12} />,
              roles: ["IT Personnel"],
            },
            {
              name: "View Broadsheet",
              link: "/results/broadsheet",
              icon: <MdOutlineMail size={14} />,
            },
          ]}
        >
          <IconComponent color={"warning.200"}>
            <BiSpreadsheet size={18} />
          </IconComponent>
          Performancce
        </NavItemComponent>
      )}

      {/* Fees */}
      {allowedUserRoles(user, ["Principal", "Bursar"]) && (
        <NavItemComponent link={"/admin/fees"}>
          <IconComponent color={"warning.200"}>
            <MdOutlineBed size={18} />
          </IconComponent>
          Fees
        </NavItemComponent>
      )}

      {/* Finance */}
      {allowedUserRoles(user, ["Principal", "Bursar"]) && (
        <NavItemComponent
          submenu={[
            {
              name: "All Transactions",
              link: "/admin/finance/fees",
              icon: <MdHistory color={"white"} size={12} />,
            },
            {
              name: "Query Transacttion",
              link: "/admin/transactions",
              icon: <MdHistory color={"white"} size={12} />,
            },
          ]}
        >
          <IconComponent color={"warning.200"}>
            <MdOutlineBed size={18} />
          </IconComponent>
          Finance
        </NavItemComponent>
      )}

      {/* Promotion Manager */}
      {allowedUserRoles(user, ["Principal", "Bursar"]) && (
        <NavItemComponent
          link={"/admin/promotion"}
          submenu={[
            {
              name: "All Transactions",
              link: "/admin/finance/fees",
              icon: <MdHistory color={"white"} size={12} />,
            },
            {
              name: "Query Transacttion",
              link: "/admin/transactions",
              icon: <MdHistory color={"white"} size={12} />,
            },
          ]}
        >
          <IconComponent color={"warning.200"}>
            <MdOutlineBed size={18} />
          </IconComponent>
          Promotion Manager
        </NavItemComponent>
      )}

      {/* Resources */}
      {allowedUserRoles(user, ["Class Teacher", "Subject Teacher"]) && (
        <NavItemComponent
          submenu={[
            {
              name: "Manage Evaluation",
              link: "/admin/resources/",
              icon: <MdHistory color={"white"} size={12} />,
            },
            {
              name: "Lesson Notes",
              link: "/admin/transactions",
              icon: <MdHistory color={"white"} size={12} />,
            },
            {
              name: "Recommendations",
              link: "/admin/transactions",
              icon: <MdHistory color={"white"} size={12} />,
            },
          ]}
        >
          <IconComponent color={"warning.200"}>
            <MdOutlineBed size={18} />
          </IconComponent>
          Resources
        </NavItemComponent>
      )}

      {/* Write */}
      {allowedUserRoles(user, ["Principal", "Bursar"]) && (
        <NavItemComponent
          submenu={[
            {
              name: "Articles",
              link: "/admin/write/articles",
              icon: <MdHistory color={"white"} size={12} />,
            },
            {
              name: "Announcements",
              link: "/admin/transactions",
              icon: <MdHistory color={"white"} size={12} />,
            },
            {
              name: "Broadcasts",
              link: "/admin/transactions",
              icon: <MdHistory color={"white"} size={12} />,
            },
            {
              name: "Messages",
              link: "/admin/transactions",
              icon: <MdHistory color={"white"} size={12} />,
            },
          ]}
        >
          <IconComponent color={"warning.200"}>
            <MdOutlineBed size={18} />
          </IconComponent>
          Write
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
  );
};
