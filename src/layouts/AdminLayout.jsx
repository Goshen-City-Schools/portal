import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/SideBar/AdminSideBar";
import AdminHeader from "../components/Header/AdminHeader.component";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../screens/Loading.screen";
import defaultConfigValues from "../data/defaultConfigValues";

export default function AdminLayout() {
  const user = defaultConfigValues.user;

  const navigate = useNavigate();

  console.log(JSON.stringify(user, null, 2));

  if (user == null) {
    navigate("/admin/auth"); // Replace '/auth' wi`th the actual login page path
    return <LoadingScreen navigateToPath={"/auth"} />;
  }

  return (
    <div className="relative">
      <AdminSideBar />
      <main className="ml-[260px] overflow-x-hidden">
        <AdminHeader />
        <Outlet />
      </main>
    </div>
  );
}
