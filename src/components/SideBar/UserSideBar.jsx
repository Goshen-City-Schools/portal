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
      <NavItemComponent onClick={handleToggleSideMenu} link={"/admin/home"}>
        <IconComponent color={"warning.200"}>
          <PiDotsNineBold size={18} />
        </IconComponent>
        Dashboard
      </NavItemComponent>

      {/* Payments */}
      <NavItemComponent
        submenu={[
          {
            name: "Transaction History",
            link: "/admin/students",
            icon: <MdEditDocument size={12} />,
          },
          {
            name: "Generate Invoice",
            link: "/admin/students/new",
            icon: <MdAdd size={14} />,
          },
        ]}
      >
        <IconComponent color={"warning.200"}>
          <FaFileInvoiceDollar size={18} />
        </IconComponent>
        Payments
      </NavItemComponent>

      {/* Transactions History */}
      <NavItemComponent
        submenu={[
          {
            name: "Assignments",
            link: "/admin/students",
            icon: <MdEditDocument size={12} />,
          },
          {
            name: "Tests",
            link: "/admin/students/new",
            icon: <MdAdd size={14} />,
          },
          {
            name: "Examinations",
            link: "/admin/students/new",
            icon: <MdAdd size={14} />,
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
            link: "/admin/students",
            icon: <MdWhatsapp size={12} />,
          },
        ]}
      >
        <IconComponent color={"warning.200"}>
          <BsFillFileEarmarkSpreadsheetFill size={18} />
        </IconComponent>
        Results
      </NavItemComponent>

      {/* Events */}
      <NavItemComponent
        submenu={[
          {
            name: "View Events",
            link: "/admin/events",
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
            name: "Send Message",
            link: "/admin/students",
            icon: <MdOutlineChat size={12} />,
          },
          {
            name: "Send Email",
            link: "/staff?type=academic",
            icon: <MdOutlineMail size={14} />,
          },
        ]}
      >
        <IconComponent color={"warning.200"}>
          <SiGooglechat size={18} />
        </IconComponent>
        Communication
      </NavItemComponent>
    </List>
  );
};
