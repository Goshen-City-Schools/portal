import React from "react";
import { Link } from "react-router-dom";

import { BsChevronDown } from "react-icons/bs";

import Avatar from "../Avatar.component";
import { CiBellOn } from "react-icons/ci";

import { Box } from "@chakra-ui/react";
import SearchWidget from "../../widgets/Search.widget";

export default function AdminHeader() {
  return (
    <Box
      bg={"white"}
      paddingX={6}
      width={"calc(100vw - 260px)"}
      className="left-['260px'] h-20 fixed top-0 z-40 shadow-md flex items-center justify-between"
    >
      <SearchWidget text={"Search students, staffs, events..."} />

      <div className="flex items-center gap-4 text-sm">
        <div className="flex flex-col">
          <p className="font-bold first-letter:">2023/2024 session</p>
          <p>First Term</p>
        </div>

        <div className="absolute top-20 hidden">
          <ul>
            <li>
              <Link>My Profile</Link>
            </li>
            <li>
              <Link>Settings</Link>
            </li>
          </ul>
        </div>

        <div className="icon">
          <CiBellOn size={28} />
        </div>

        <Link to="/dashboard/profile" className="flex gap-3 items-center">
          <div className="h-12 w-12 rounded-full relative  shadow-md overflow-hidden">
            <img
              src="/avatar.png"
              alt="User avatar"
              className="absolute object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-bold first-letter:">Nkechinyere Harrison</p>
            <p>Admin</p>
          </div>
          <BsChevronDown size={20} />.
        </Link>
      </div>
    </Box>
  );
}
