import React from "react";
import { Link } from "react-router-dom";

import { BsChevronDown } from "react-icons/bs";

import Avatar from "../Avatar.component";
import { CiBellOn } from "react-icons/ci";

import { Box } from "@chakra-ui/react";

export default function Header() {
  return (
    <Box
      bg={"white"}
      paddingX={6}
      className="h-20 sticky top-0 left-0 z-40 shadow-md w-full flex items-center justify-between"
    >
      <h3 className="text-xl font-bold">Welcome back, Nkechinyere</h3>

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
          <div className="h-12 w-12 rounded-full shadow-md overflow-hidden relative">
            <img
              src="/avatar.png"
              alt="User avatar"
              className="absolute object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-bold first-letter:">Nkechinyere Harrison</p>
            <p>Student</p>
          </div>
          <BsChevronDown size={20} />.
        </Link>
      </div>
    </Box>
  );
}
