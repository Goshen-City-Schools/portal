import React, { useState } from "react";
import { ListItem, Collapse, Box, List } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import linkIsActive from "../utilities/linkIsActive";
import IconComponent from "./Icon.component";

import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import the correct icons

export default function NavItemComponent({ link, children, submenu }) {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const handleToggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  return link ? (
    <ListItem
      rounded={"md"}
      _hover={{ bg: "brand.700", color: "white", cursor: "pointer" }}
      className={`flex justify-start font-bold items-center ${
        linkIsActive(link) ? "bg-blue-800" : ""
      }`}
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
      <Collapse in={showSubmenu} animateOpacity>
        <List pl={2} pt={2} gap={2}>
          {submenu &&
            submenu.map((item, index) => (
              <ListItem
                key={index}
                _hover={{ bg: "brand.700", color: "white", cursor: "pointer" }}
                className="flex justify-start pl-2 py-2 font-bold items-center"
                mt={1} // Adjust the margin-top as needed
              >
                {item}
              </ListItem>
            ))}
        </List>
      </Collapse>
    </ListItem>
  );
}
