import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../screens/Loading.screen";
import AdminLayout from "./AdminLayout";
import StudentLayout from "./StudentLayout";

export default function Layout({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  if (user == null) {
    navigate("/auth"); // Replace '/auth' wi`th the actual login page path
    return <LoadingScreen navigateToPath={"/auth"} />;
  }

  return user.userType == "Staff" ? (
    <AdminLayout>{children}</AdminLayout>
  ) : (
    <StudentLayout>{children}</StudentLayout>
  );
}
