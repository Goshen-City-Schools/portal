import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSideBar from '../components/SideBar/AdminSideBar';
import AdminHeader from '../components/Header/AdminHeader.component';

export default function AdminLayout() {
  return (
    <div className="relative">
      <AdminSideBar />
      <main className="ml-[260px] overflow-x-hidden">
        <AdminHeader />
        Admin
        <Outlet />
      </main>
    </div>
  );
}
