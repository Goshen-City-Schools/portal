import React from "react";

import { List } from "@chakra-ui/react";

import { TbFolderSearch } from "react-icons/tb";
import { SiGooglechat } from "react-icons/si";
import { PiDotsNine, PiDotsNineBold } from "react-icons/pi";

import { BsFillFileEarmarkSpreadsheetFill } from "react-icons/bs";

import {
  MdAdd,
  MdEditDocument,
  MdOutlineMail,
  MdWhatsapp,
  MdOutlineChat,
  MdOutlineBroadcastOnPersonal,
  MdSubject,
  MdAssessment,
  MdReceipt,
  MdHistory,
  MdClass,
  MdAssignment,
  MdTextFormat,
} from "react-icons/md";

import { PiStudentDuotone } from "react-icons/pi";
import { LuCalendarDays } from "react-icons/lu";
import { BiSpreadsheet } from "react-icons/bi";
import { TbMessages } from "react-icons/tb";

import IconComponent from "../Icon.component";
import NavItemComponent from "../NavItem.component";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";

export const UserSideBarList = ({ handleToggleSideMenu }) => {
  return (
    <List className="memuList pl-1" w={"full"}>
      <NavItemComponent onClick={handleToggleSideMenu} link={"/home"}>
        <IconComponent color={"warning.200"}>
          <PiDotsNineBold size={18} />
        </IconComponent>
        Dashboard
      </NavItemComponent>

      {/* Payments */}
      <NavItemComponent
        submenu={[
          {
            name: "Generate Invoice",
            link: "/fees",
            icon: <MdReceipt size={14} />,
          },
          {
            name: "View payments",
            link: "/transactions",
            icon: <MdHistory size={12} />,
          },
        ]}
      >
        <IconComponent color={"warning.200"}>
          <FaFileInvoiceDollar size={18} />
        </IconComponent>
        Fees
      </NavItemComponent>

      {/* Transactions History */}
      <NavItemComponent
        submenu={[
          {
            name: "Assignments",
            link: "",
            icon: <MdAssignment size={12} />,
          },
          {
            name: "Tests",
            link: "/new",
            icon: <MdAssessment size={14} />,
          },
          {
            name: "Examinations",
            link: "/new",
            icon: <MdTextFormat size={14} />,
          },
        ]}
      >
        <IconComponent color={"warning.200"}>
          <MdAssessment size={18} />
        </IconComponent>
        Assessments
      </NavItemComponent>

      {/* My Results */}
      <NavItemComponent
        submenu={[
          {
            name: "Check My Result",
            link: "/results",
            icon: <MdWhatsapp size={12} />,
          },
          {
            name: "Get Scratch Card",
            link: "/results",
            icon: <MdWhatsapp size={12} />,
          },
        ]}
      >
        <IconComponent color={"warning.200"}>
          <BsFillFileEarmarkSpreadsheetFill size={18} />
        </IconComponent>
        My Results
      </NavItemComponent>

      {/* Events */}
      <NavItemComponent
        submenu={[
          {
            name: "Academics Calendar",
            link: "/events",
            icon: <TbFolderSearch size={12} />,
          },
          {
            name: "Timetable",
            link: "/events",
            icon: <TbFolderSearch size={12} />,
          },
          {
            name: "Upcoming Events",
            link: "/events",
            icon: <TbFolderSearch size={12} />,
          },
        ]}
      >
        <IconComponent color={"warning.200"}>
          <FaCalendarAlt size={18} />
        </IconComponent>
        Calendar
      </NavItemComponent>

      {/* Communication */}
      <NavItemComponent
        submenu={[
          {
            name: "Support",
            link: "/chat",
            icon: <MdOutlineChat size={12} />,
          },
          {
            name: "IT Admin",
            link: "/contacts",
            icon: <MdOutlineMail size={14} />,
          },
        ]}
      >
        <IconComponent color={"warning.200"}>
          <SiGooglechat size={18} />
        </IconComponent>
        Chat
      </NavItemComponent>
    </List>
  );
};
