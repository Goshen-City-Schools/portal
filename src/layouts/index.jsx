import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const { userData } = useSelector((state) => state.form);
  const navigate = useNavigate();

  // Check if userData is not set and navigate to the login page
  if (!userData) {
    navigate('/auth'); // Replace '/auth' with the actual login page path
    return null; // Optionally, you can return null to prevent rendering the layout
  }

  return userData.userType === 'Staff' ? (
    <AdminLayout>{children}</AdminLayout>
  ) : (
    <StudentLayout>{children}</StudentLayout>
  );
}
