import React from 'react';
import SideMenu from '../components/SideMenu';
import Header from '../components/Header.component';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="relative">
      <SideMenu />
      <main className="ml-[280px]">
        <Header />
        Admin
        <Outlet />
      </main>
    </div>
  );
}
