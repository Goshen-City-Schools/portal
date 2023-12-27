import React from "react";

import allowedUserRoles from "../../helpers/allowedUserRoles";

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
  MdOutlineBroadcastOnPersonal,
  MdCreateNewFolder,
  MdEditNote,
} from "react-icons/md";
import { GrDocumentPerformance } from "react-icons/gr";

import { PiStudentDuotone } from "react-icons/pi";
import { LuCalendarDays, LuMessagesSquare } from "react-icons/lu";
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
import { FaChalkboardTeacher } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";

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

      {/* Students Navigation */}
      {allowedUserRoles(user, [
        "495420506572736f6e6e656c",
        "IT Personnel",
        "School Teacher",
        "Class Teacher",
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
              name: "Enroll Student",
              link: "/admin/students/new",
              icon: <MdAdd size={14} />,
              roles: ["IT Personnel"],
            },
            {
              name: "Manage Promotion",
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

      {/* Performance */}
      {allowedUserRoles(user, [
        "IT Personnel",
        "Subject Teacher",
        "Class Teacher",
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
              roles: ["IT Personnel"],
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
      {allowedUserRoles(user, ["IT Personnel", "Principal", "Bursar"]) && (
        <NavItemComponent
          submenu={[
            {
              name: "Fees Report",
              link: "/admin/finance/fees",
              icon: <MdHistory color={"white"} size={12} />,
            },
            {
              name: "All Invoices",
              link: "/admin/transactions",
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
            <PiCurrencyNgn size={18} />
          </IconComponent>
          Finance
        </NavItemComponent>
      )}

      {/* e-Library */}
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

      {/* Communication
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
      )} */}

      {/* Write */}
      {allowedUserRoles(user, ["Principal", "IT Personnel", "Bursar"]) && (
        <NavItemComponent link={"/admin/messages"}>
          <IconComponent color={"warning.200"}>
            <LuMessagesSquare size={18} />
          </IconComponent>
          e-Library
        </NavItemComponent>
      )}

      {/* Media Uploads */}
      {allowedUserRoles(user, ["Principal", "IT Personnel", "Bursar"]) && (
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
