import React from 'react';
import Header from '../components/Header.component';
import SideMenu from '../components/SideMenu';
import SessionTerm from '../components/forms/SessionTerm.form';

export default function Home() {
  return (
    <div className="relative">
      <SideMenu />
      <main className="ml-[280px]">
        <Header />
        <div className="paySection flex justify-center pt-20">
          <SessionTerm />
        </div>
      </main>
    </div>
  );
}
