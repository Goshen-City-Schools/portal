import React from "react";

import { ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import linkIsActive from "../utilities/linkIsActive";

export default function NavItemComponent({ onClick, link, children }) {
  return link ? (
    <ListItem
      rounded={"md"}
      _hover={{ bg: "brand.700", color: " white", cursor: "pointer" }}
      className={`flex justify-start font-bold items-center ${
        linkIsActive(link) ? "bg-blue-800" : ""
      }`}
      marginTop={"0"}
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
      roundedTopLeft={"md"}
      roundedBottomLeft={"md"}
      _hover={{ bg: "brand.700", color: " white", cursor: "pointer" }}
      className="flex justify-start pl-4 py-3 gap-4 font-bold items-center"
      onClick={onClick}
    >
      {children}
    </ListItem>
  );
}
