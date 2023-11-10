import React, { useMemo } from "react";
import { useUser } from "../app/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import allowedUserRoles from "../helpers/allowedUserRoles";

const PrivateLink = ({ children, roles }) => {
  const navigate = useNavigate();
  const { user } = useUser();

  const isLinkAllowed = useMemo(() => {
    // Your permission logic here
    // Check if the user is allowed to access the link based on their roles
    // For simplicity, assuming that the link is allowed if the user is logged in
    return allowedUserRoles(user, roles);
  }, [user]);

  const handleClick = () => {
    if (!isLinkAllowed) {
      navigate("/restricted-access");
    }
  };

  return (
    <div onClick={handleClick}>
      {/* You can use any link component (e.g., React Router's Link) here */}
      {children}
    </div>
  );
};

export default PrivateLink;
