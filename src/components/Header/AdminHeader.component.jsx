import React from "react";

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
  Grid,
} from "@chakra-ui/react";

import SearchWidget from "../../widgets/Search.widget";
import IconComponent from "../Icon.component";

import { toggleSideMenu } from "../../app/redux/slices/menuSlice";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../app/contexts/UserContext";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AdminHeader() {
  const { user } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useUser();
  const [newNotification, setNewNotification] = useState(2);

  const handleToggleSideMenu = () => {
    dispatch(toggleSideMenu());
  };

  const handleLogout = () => {
    // Dispatch the logout action when the "Logout" button is clicked
    logout();
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
      className="h-20 no-print fixed top-0 z-40 shadow-sm flex items-center justify-between"
    >
      <Flex
        // display={{ "base": "flex", "md": "none" }}
        alignItems={"center"}
        gap={3}
      >
        <Grid placeItems={"center"} p={0.5} border={"1px solid"} rounded={"md"}>
          <IconComponent click={handleToggleSideMenu}>
            <MdMenu size={24} />
          </IconComponent>
        </Grid>

        <Text as={"h3"} color={"brand.900"} className="text-md font-bold">
          {user.firstName}&nbsp;{user.lastName}
        </Text>
      </Flex>

      <div className="flex items-center gap-4 text-sm">
        <Flex direction={"column"} display={{ "base": "none", "md": "flex" }}>
          <p className="font-bold first-letter:">2023/2024 session</p>
          <p>First Term</p>
        </Flex>

        <Link to={"/admin/notifications"} onClick={() => setNewNotification(0)}>
          <div className="icon  mx-8 relative">
            <CiBellOn size={28} />{" "}
            {newNotification && newNotification > 0 ? (
              <Text
                bg={"gray.100"}
                height={"max-content"}
                h={4}
                w={4}
                display={"grid"}
                placeItems={"center"}
                rounded={"full"}
                lineHeight={1}
                position={"absolute"}
                top={-1}
                right={-1}
                as={"small"}
                fontWeight={"bold"}
                color={"red"}
              >
                {newNotification}
              </Text>
            ) : (
              ""
            )}
          </div>
        </Link>

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
