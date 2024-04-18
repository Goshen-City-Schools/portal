import React from "react";

import allowedUserRoles from "../../helpers/allowedUserRoles";
import roles from "../../constants/roles";

import { List } from "@chakra-ui/react";

import { TbFolderSearch, TbWorldUpload } from "react-icons/tb";
import { RiParentLine } from "react-icons/ri";
import { PiCurrencyNgn, PiDotsNine } from "react-icons/pi";

import {
  MdOutlineBed,
  MdAdd,
  MdEditDocument,
  MdOutlineMail,
  MdWhatsapp,
  MdOutlineChat,
  MdHistory,
  MdCreateNewFolder,
  MdEditNote,
} from "react-icons/md";

import { PiStudentDuotone } from "react-icons/pi";
import { LuCalendarDays, LuMessagesSquare } from "react-icons/lu";

import IconComponent from "../Icon.component";
import NavItemComponent from "../NavItem.component";
import {
  AddSubjectPortal,
  CreateEventPortal,
  CreateSubClassPortal,
} from "../../portals";
import { useModal } from "../../app/contexts/ModalContext";
import { GiProgression } from "react-icons/gi";

export const AdminSideBarList = ({ user, handleToggleSideMenu }) => {
  const { ROLES, allowedRoles } = roles;

  const { openPortal } = useModal();
  const handleClick = (type) => {
    if (type === "event") return openPortal(<CreateEventPortal />);
    if (type === "createSubject") return openPortal(<AddSubjectPortal />);
    if (type === "createClass") return openPortal(<CreateSubClassPortal />);
  };

  return (
    <List className="memuList pl-1" w={"full"}>
      <NavItemComponent onClick={handleToggleSideMenu} link={"/admin/home"}>
        <IconComponent color={"warning.200"}>
          <PiDotsNine size={16} />
        </IconComponent>
        Dashboard
      </NavItemComponent>

      {/* Parents Navigation */}
      {allowedUserRoles(user, [ROLES.IT_PERSONNEL, ROLES.CLASS_TEACHER]) && (
        <NavItemComponent
          submenu={[
            {
              name: "Manage Parents",
              link: "/admin/parents",
              icon: <MdEditDocument size={12} />,
            },
            {
              link: "/admin/parents/new",
              name: "Add Parent",
              icon: <MdAdd size={14} />,
              roles: [ROLES.IT_PERSONNEL],
            },
          ]}
        >
          <IconComponent color={"warning.200"}>
            <RiParentLine size={18} />
          </IconComponent>
          Parents
        </NavItemComponent>
      )}

      {/* Students Navigation */}
      {allowedUserRoles(user, [
        ROLES.IT_PERSONNEL,
        ROLES.SUBJECT_TEACHER,
        ROLES.CLASS_TEACHER,
        ROLES.BURSAR,
      ]) && (
        <NavItemComponent
          submenu={[
            {
              name: "Manage Students",
              link: "/admin/students",
              icon: <MdEditDocument size={12} />,
            },
            {
              name: "Enroll Student",
              link: "/admin/students/new",
              icon: <MdAdd size={14} />,
              roles: [ROLES.IT_PERSONNEL],
            },
            {
              name: "Manage Promotion",
              link: "/admin/students/new",
              icon: <MdAdd size={14} />,
              roles: [ROLES.IT_PERSONNEL],
            },
          ]}
        >
          <IconComponent color={"warning.200"}>
            <PiStudentDuotone size={18} />
          </IconComponent>
          Students
        </NavItemComponent>
      )}

      {/* Performance */}
      {allowedUserRoles(user, [
        ROLES.IT_PERSONNEL,
        ROLES.SUBJECT_TEACHER,
        ROLES.CLASS_TEACHER,
      ]) && (
        <NavItemComponent
          submenu={[
            {
              name: "View Results",
              link: "/admin/results",
              icon: <MdOutlineChat size={12} />,
            },
            {
              name: "Upload Result",
              link: "/admin/results",
              icon: <MdOutlineChat size={12} />,
            },
            {
              name: "View Broadsheet",
              link: "/admin/results",
              icon: <MdWhatsapp size={12} />,
              roles: [ROLES.IT_PERSONNEL],
            },
          ]}
        >
          <IconComponent color={"warning.200"}>
            <GiProgression size={18} />
          </IconComponent>
          Results
        </NavItemComponent>
      )}

      {/* Finance */}
      {allowedUserRoles(user, [
        ROLES.IT_PERSONNEL,
        ROLES.PRINCIPAL,
        ROLES.BURSAR,
      ]) && (
        <NavItemComponent
          submenu={[
            {
              name: "Fees",
              link: "/admin/finance/fees",
              icon: <MdHistory color={"white"} size={12} />,
            },
            {
              name: "Transactions",
              link: "/admin/finance/transactions",
              icon: <MdHistory color={"white"} size={12} />,
            },
            {
              name: "Expenses",
              link: "/admin/transactions",
              icon: <MdHistory color={"white"} size={12} />,
            },
            {
              name: "Income",
              link: "/admin/transactions",
              icon: <MdHistory color={"white"} size={12} />,
            },
          ]}
        >
          <IconComponent color={"warning.200"}>
            <PiCurrencyNgn size={18} />
          </IconComponent>
          Finance
        </NavItemComponent>
      )}

      {/* e-Library */}
      {allowedUserRoles(user, [ROLES.CLASS_TEACHER, ROLES.SUBJECT_TEACHER]) && (
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

      {/* Events */}
      <NavItemComponent
        submenu={[
          {
            name: "Manage Events",
            link: "/admin/events",
            icon: <TbFolderSearch size={12} />,
          },
          {
            name: "Create event",
            link: "/admin/events",
            icon: <MdCreateNewFolder size={12} />,
            roles: [ROLES.IT_PERSONNEL],
            onClick: () => handleClick("event"),
          },
          {
            name: "Send Invite",
            link: "/admin/events",
            icon: <MdOutlineMail size={14} />,
            roles: [ROLES.IT_PERSONNEL],
            onClick: () => alert("feature updates..."),
          },
        ]}
      >
        <IconComponent color={"warning.200"}>
          <LuCalendarDays size={18} />
        </IconComponent>
        Calendar
      </NavItemComponent>

      {/* Communication
      {allowedUserRoles(user, [ROLES.IT_PERSONNEL, ROLES.PRINCIPAL]) && (
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
      )} */}

      {/* Write */}
      {allowedUserRoles(user, [
        ROLES.PRINCIPAL,
        ROLES.IT_PERSONNEL,
        ROLES.BURSAR,
      ]) && (
        <NavItemComponent link={"/admin/messages"}>
          <IconComponent color={"warning.200"}>
            <LuMessagesSquare size={18} />
          </IconComponent>
          e-Library
        </NavItemComponent>
      )}

      {/* Media Uploads */}
      {allowedUserRoles(user, [
        ROLES.PRINCIPAL,
        ROLES.IT_PERSONNEL,
        ROLES.BURSAR,
      ]) && (
        <NavItemComponent
          submenu={[
            {
              name: "Write",
              link: "/admin/articles",
              icon: <MdEditNote color={"white"} size={12} />,
            },
            {
              name: "Gallery",
              link: "/admin/transactions",
              icon: <MdHistory color={"white"} size={12} />,
            },
          ]}
        >
          <IconComponent color={"warning.200"}>
            <TbWorldUpload size={18} />
          </IconComponent>
          Media
        </NavItemComponent>
      )}
    </List>
  );
};
