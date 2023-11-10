import React, { useState } from "react";
import { ListItem, Collapse, Box, List } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import linkIsActive from "../utilities/linkIsActive";
import IconComponent from "./Icon.component";

import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import the correct icons
import allowedUserRoles from "../helpers/allowedUserRoles";
import { useUser } from "../app/contexts/UserContext";

export default function NavItemComponent({ link, children, submenu, click }) {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const { user } = useUser();

  const handleToggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  return link ? (
    <ListItem
      w={"full"}
      rounded={"md"}
      _hover={{ bg: "brand.700", color: "white", cursor: "pointer" }}
      className={`flex justify-start font-bold items-center ${
        linkIsActive(link) ? "bg-blue-800" : ""
      }`}
      onClick={click}
    >
      <NavLink
        to={link}
        className="flex w-full h-full pl-4 py-3 gap-4 justify-start font-bold items-center"
      >
        {children}
      </NavLink>
    </ListItem>
  ) : (
    <ListItem
      roundedTopLeft="md"
      roundedBottomLeft="md"
      display="flex"
      w={"full"}
      flexDirection={"column"}
      _hover={{ bg: "brand.700", color: "white", cursor: "pointer" }}
      className="flex justify-start pl-4 py-3 font-bold items-center"
      onClick={handleToggleSubmenu}
    >
      <Box
        display="flex"
        width={"full"}
        gap={4}
        justifyContent={"space-between"}
      >
        <Box display="flex" width={"full"} gap={4}>
          {children}
        </Box>
        <IconComponent>
          {showSubmenu ? <FaChevronUp /> : <FaChevronDown />}
        </IconComponent>
      </Box>
      <Collapse in={showSubmenu} animateOpacity className="w-full">
        <List pl={4} pt={2} gap={2} w={"full"} fontSize={".8rem"}>
          {submenu &&
            submenu.map((item, index) =>
              item?.roles ? (
                allowedUserRoles(user, item.roles) && (
                  <NavLink
                    to={`${item.link}`}
                    key={index}
                    _hover={{
                      bg: "brand.700",
                      color: "white",
                      cursor: "pointer",
                    }}
                    className="flex justify-start font-normal mt-1 w-full gap-1 pl-2 py-2 items-center"
                    onClick={item?.onClick}
                  >
                    {item?.icon && <IconComponent> {item.icon}</IconComponent>}
                    {item.name}
                  </NavLink>
                )
              ) : (
                <NavLink
                  to={`${item.link}`}
                  key={index}
                  _hover={{
                    bg: "brand.700",
                    color: "white",
                    cursor: "pointer",
                  }}
                  className="flex justify-start font-normal mt-1 w-full gap-1 pl-2 py-2 items-center"
                  onClick={item?.onClick}
                >
                  {item?.icon && <IconComponent> {item.icon}</IconComponent>}
                  {item.name}
                </NavLink>
              )
            )}
        </List>
      </Collapse>
    </ListItem>
  );
}
