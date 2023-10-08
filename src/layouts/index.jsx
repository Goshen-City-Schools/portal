import React from 'react';
import AdminLayout from './AdminLayout';
import StudentLayout from './StudentLayout';

export default function Layout({ isadmin = false, children }) {
  return isadmin ? (
    <AdminLayout>{children}</AdminLayout>
  ) : (
    <StudentLayout>{children}</StudentLayout>
  );
}
