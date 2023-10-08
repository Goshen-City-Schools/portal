import React from 'react';
import Header from '../components/Header.component';
import SideMenu from '../components/SideMenu';
import SessionTerm from '../components/forms/SessionTerm.form';
import Layout from '../layouts';

export default function Home() {
  return (
    <div className="paySection flex justify-center pt-20">
      <SessionTerm />
    </div>
  );
}
