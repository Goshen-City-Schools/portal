import React from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { BsChevronDown } from "react-icons/bs";

import { CiBellOn } from "react-icons/ci";

import { Box, Flex } from "@chakra-ui/react";
import SearchWidget from "../../widgets/Search.widget";
import IconComponent from "../Icon.component";
import { MdMenu } from "react-icons/md";

import { toggleSideMenu } from "../../app/redux/slices/menuSlice";

export default function AdminHeader() {
  const dispatch = useDispatch();

  const handleToggleSideMenu = () => {
    dispatch(toggleSideMenu());
  };

  return (
    <Box
      bg={"white"}
      paddingX={6}
      width={{ "base": "100%", "lg": "calc(100vw - 260px)" }}
      left={{ "lg": "260px" }}
      className="h-20 fixed top-0 z-40 shadow-md flex items-center justify-between"
    >
      <SearchWidget text={"Search students, staffs, events..."} />
      <Flex
        color={"brand.700"}
        display={{ "base": "flex", "md": "none" }}
        alignItems={"center"}
        gap={3}
      >
        <IconComponent click={handleToggleSideMenu}>
          <MdMenu size={24} />
        </IconComponent>
        <h3 className="text-md font-bold">Welcome back, Nkechinyere</h3>
      </Flex>

      <div className="flex items-center gap-4 text-sm">
        <Flex direction={"column"} display={{ "base": "none", "md": "flex" }}>
          <p className="font-bold first-letter:">2023/2024 session</p>
          <p>First Term</p>
        </Flex>

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
          <Flex direction={"column"} display={{ "base": "none", "md": "flex" }}>
            <p className="font-bold first-letter:">Nkechinyere Harrison</p>
            <p>Admin</p>
          </Flex>
          <BsChevronDown size={20} />.
        </Link>
      </div>
    </Box>
  );
}
