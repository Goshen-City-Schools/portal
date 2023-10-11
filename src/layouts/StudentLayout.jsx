import React from "react";
import Header from "../components/Header/Header.component";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import { useNavigate } from "react-router-dom";

export default function StudentLayout() {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  if (user == null) {
    navigate("/auth"); // Replace '/auth' wi`th the actual login page path
    return <LoadingScreen navigateToPath={"/auth"} />;
  }

  return (
    <div className="relative">
      <SideBar />
      <main className="ml-[260px] overflow-x-hidden bg-[#F1F1F1]">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
