import React from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../screens/Loading.screen";
import { useLocation } from "react-router-dom";

export default function AuthLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  if (user == null) {
    navigate("/auth"); // Replace '/auth' wi`th the actual login page path
    return <LoadingScreen navigateToPath={"/auth"} />;
  }

  if (
    user &&
    user.userType == "Student" &&
    location.pathname.includes("/admin")
  ) {
    return <LoadingScreen navigateToPath={"/auth"} />;
  }

  if (
    user &&
    user.userType == "Staff" &&
    !location.pathname.includes("/admin")
  ) {
    return <LoadingScreen navigateToPath={"/auth"} />;
  }

  return <div>{children}</div>;
}
