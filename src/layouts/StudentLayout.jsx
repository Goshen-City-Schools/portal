import React from "react";
import Header from "../components/Header/Header.component";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";

export default function StudentLayout() {
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
