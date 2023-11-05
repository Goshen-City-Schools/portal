import React from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { BsChevronDown } from "react-icons/bs";
import { CiBellOn } from "react-icons/ci";
import { MdMenu } from "react-icons/md";

import {
  Box,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Text,
} from "@chakra-ui/react";

import SearchWidget from "../../widgets/Search.widget";
import IconComponent from "../Icon.component";

import { toggleSideMenu } from "../../app/redux/slices/menuSlice";
import { logout } from "../../app/redux/slices/formSlice";
import { useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleSideMenu = () => {
    dispatch(toggleSideMenu());
  };

  const handleLogout = () => {
    // Dispatch the logout action when the "Logout" button is clicked
    dispatch(logout());
    console.log("m");
    setTimeout(() => {
      navigate("/auth");
    }, 1000); // Adjust the delay as needed
  };

  return (
    <Box
      bg={"white"}
      paddingX={6}
      width={{ "base": "100%", "lg": "calc(100vw - 260px)" }}
      left={{ "lg": "260px" }}
      className="h-20 no-print fixed top-0 z-40 shadow-md flex items-center justify-between"
    >
      <SearchWidget
        text={"Search students, staffs, events..."}
        height={"36px"}
      />
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

        <div className="icon  mx-8">
          <CiBellOn size={28} />
        </div>

        <Popover>
          <PopoverTrigger>
            <Box className="flex gap-3 items-center" cursor="pointer">
              <div className="h-10 w-10 rounded-full relative shadow-md overflow-hidden">
                <img
                  src="/avatar.png"
                  alt="User avatar"
                  className="absolute object-cover w-full h-full"
                />
              </div>
              <Flex direction={"column"} display={{ base: "none", md: "none" }}>
                <p className="font-bold first-letter:">Nkechinyere Harrison</p>
                <p>Admin</p>
              </Flex>
              <BsChevronDown size={18} />
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              <Text as={"h3"}>Administrator</Text>
            </PopoverHeader>
            <PopoverBody>
              <Button
                variant="ghost"
                w="100%"
                justifyContent="flex-start"
                onClick={() => navigate("/admin/profile")}
              >
                My Profile
              </Button>
              <Button
                variant="ghost"
                w="100%"
                justifyContent="flex-start"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
    </Box>
  );
}
