import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../app/contexts/UserContext";

import { Box, Text, VStack, List, Flex } from "@chakra-ui/react";
import { FaChevronRight, FaTimes } from "react-icons/fa";
import {
  MdOutlinePrecisionManufacturing,
  MdOutlineSupportAgent,
} from "react-icons/md";

import IconComponent from "../components/Icon.component";
import Logo from "../components/Logo.component";
import NavItemComponent from "../components/NavItem.component";
import Avatar from "../components/Avatar.component";
import { toggleSideMenu } from "../app/redux/slices/menuSlice";

import "./SideMenu.style.css";

import { AdminSideBarList } from "../components/SideBar/AdminSideBar";
import { UserSideBarList } from "../components/SideBar/UserSideBar";
import allowedUserRoles from "../helpers/allowedUserRoles";
import { GrHistory } from "react-icons/gr";
import { TbHistory } from "react-icons/tb";

export default function SideBarLayout() {
  const dispatch = useDispatch();
  const { user } = useUser();
  const isSideMenuOpen = useSelector((state) => state.menu.isSideMenuOpen);

  const handleToggleSideMenu = () => {
    dispatch(toggleSideMenu());
  };

  return (
    <Box
      as="aside"
      bg={"brand.900"}
      width={{
        "base": isSideMenuOpen ? "calc(260px + 16px)" : "0px", // Adjusted width to include scrollbar width
        "md": "260px",
      }}
      position={"fixed"}
      top={0}
      fontSize={"sm"}
      zIndex={50}
      left={0}
      overflowY={"auto"}
      overflowX={"hidden"} // Set overflowX to "hidden" to hide the scrollbar
      height={"full"}
      style={{
        "scrollbar-gutter": " stable",
      }}
    >
      {/* Close Sidebar */}

      <Box
        position={"absolute"}
        top={"80px"}
        right={"0"}
        bg={"red.700"}
        color={"white"}
        h={10}
        w={10}
        rounded={"full"}
        zIndex={50}
        display={{ "base": "flex", "md": "none" }}
        justifyContent={"center"}
        alignItems={"center"}
        onClick={handleToggleSideMenu}
      >
        <IconComponent color={"warning.200"}>
          <FaTimes size={20} />
        </IconComponent>
      </Box>

      <Box
        position={"relative"}
        zIndex={40}
        py={2}
        className="sideBar-header h-max shadow-sm flex items-center  w-full"
      >
        <Logo />

        <Flex
          direction={"column"}
          justifyContent={"center"}
          display={"sticky"}
          top={0}
        >
          <Text
            as={"p"}
            className="text-md mt-1 font-bold leading-tight"
            color={"white"}
          >
            GOSHEN GROUP OF SCH.
          </Text>
          <Text
            as={"small"}
            color="whiteAlpha.800"
            className="text-[.7rem] font-bold uppercase"
          >
            Cre . Nur . Pri . Sec .
          </Text>
        </Flex>
      </Box>

      <VStack>
        <VStack mt={4}>
          <Avatar
            height={108}
            width={108}
            imageUrl={user.avatarImageURL ? user.avatarImageURL : "/avatar.png"}
          />
        </VStack>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"start"}
          w={"full"}
          className="pl-4 pr-4 py-6"
          color="white"
        >
          <h3>MENU</h3>

          {/* Admin Menu List */}
          {user.accountType === "staff" && (
            <AdminSideBarList
              handleToggleSideMenu={handleToggleSideMenu}
              user={user}
            />
          )}

          {/* User Menu List */}
          {user.accountType === "student" && (
            <UserSideBarList handleToggleSideMenu={handleToggleSideMenu} />
          )}
        </Box>
      </VStack>

      <Box className="pl-5 pb-6 pt-4" color="white">
        <h3>ACCOUNT</h3>
        <List className="memuList">
          {/*  */}

          {user.accountType === "staff" &&
            allowedUserRoles(user, [
              "8ecb5ec0-f6b0-41f5-ab88-eb2c6e7e0a28",
              "Principal",
            ]) && (
              <NavItemComponent link={"/admin/config"}>
                <IconComponent color={"warning.200"}>
                  <MdOutlinePrecisionManufacturing size={18} />
                </IconComponent>
                <Flex
                  w={"full"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  pr={4}
                >
                  Configuration <FaChevronRight />
                </Flex>
              </NavItemComponent>
            )}

          <NavItemComponent
            link={user.accountType == "staff" ? "/admin/support" : "/support"}
            onClick={handleToggleSideMenu}
          >
            <IconComponent color={"warning.200"}>
              <MdOutlineSupportAgent size={18} />
            </IconComponent>
            Help & Support
          </NavItemComponent>

          <NavItemComponent
            link={
              user?.accountType == "staff"
                ? "/admin/login_history"
                : "/login_history"
            }
            onClick={handleToggleSideMenu}
          >
            <IconComponent color={"warning.200"}>
              <TbHistory size={18} />
            </IconComponent>
            Login History
          </NavItemComponent>
        </List>
      </Box>
    </Box>
  );
}
