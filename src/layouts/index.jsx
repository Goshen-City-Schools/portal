import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../screens/Loading.screen';
import AdminLayout from './AdminLayout';
import StudentLayout from './StudentLayout';

export default function Layout({ children }) {
  const userData = localStorage.getItem('user');
  const navigate = useNavigate();

  if (userData == null) {
    navigate('/auth'); // Replace '/auth' wi`th the actual login page path
    return <LoadingScreen navigateToPath={'/auth'} />;
  }

  return userData.userType === 'Staff' ? (
    <AdminLayout>{children}</AdminLayout>
  ) : (
    <StudentLayout>{children}</StudentLayout>
  );
}
