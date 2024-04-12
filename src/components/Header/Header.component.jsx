import React from "react";

import { useDispatch } from "react-redux";

import { BsChevronDown } from "react-icons/bs";
import { CiBellOn } from "react-icons/ci";
import { MdChevronRight, MdMenu } from "react-icons/md";

import {
  Box,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Text,
  Grid,
  Image,
} from "@chakra-ui/react";

import IconComponent from "../Icon.component";

import { toggleSideMenu } from "../../app/redux/slices/menuSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/contexts/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../app/contexts/UserContext";

export default function Header() {
  const { user } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [newNotification, setNewNotification] = useState(2);

  const isStaff = user.accountType === "staff";
  const isStudent = user.accountType === "student";

  const handleToggleSideMenu = () => {
    dispatch(toggleSideMenu());
  };

  const handleLogout = () => {
    // Dispatch the logout action when the "Logout" button is clicked
    logout();
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
      <Flex alignItems={"center"} gap={4}>
        <Grid placeItems={"center"} p={0.5} border={"1px solid"} rounded={"md"}>
          <IconComponent click={handleToggleSideMenu}>
            <MdMenu size={24} />
          </IconComponent>
        </Grid>

        <Text as={"h3"} color={"brand.900"} className="text-md font-bold">
          {isStaff && "Admin Dashboard"}
          {isStudent && `Welcome back, ${user.first_name}`}
        </Text>
      </Flex>

      <Flex className="items-center text-sm" gap={{ base: 3, md: 4 }}>
        <Flex direction={"column"} display={{ "base": "none", "md": "flex" }}>
          <p className="font-bold first-letter:">2023/2024 session</p>
          <p>First Term</p>
        </Flex>

        <Link
          to={isStaff ? "/admin/notifications" : "/notifications"}
          onClick={() => setNewNotification(0)}
        >
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
                <Image
                  src={
                    user.avatarImageURL ? user.avatarImageURL : "/avatar.png"
                  }
                  height={10}
                  width={10}
                  alt="User avatar"
                  loading="lazy"
                  className="absolute object-cover w-full h-full"
                />
              </div>
              <Flex direction={"column"} display={{ base: "none", md: "flex" }}>
                <p className="font-bold first-letter:">
                  {user.first_name} {user.last_name}
                </p>
                <Text as={"small"} fontSize={"xs"}>
                  {user.accountType === "staff" && user.roles?.name}
                  {user.accountType === "student" && (
                    <Text className="capitalize">{user.accountType}</Text>
                  )}
                </Text>
              </Flex>
              <BsChevronDown size={18} />
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />

            <PopoverBody>
              <Button
                size={"sm"}
                variant="ghost"
                w="100%"
                justifyContent="flex-start"
                onClick={() =>
                  navigate(isStaff ? "/admin/profile" : "/profile")
                }
              >
                My Profile
              </Button>
              <Button
                size={"sm"}
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
      </Flex>
    </Box>
  );
}
