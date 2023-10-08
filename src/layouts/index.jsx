import React from 'react';
import AdminLayout from './AdminLayout';
import StudentLayout from './StudentLayout';

// Layout expects a props that confirms to return students layout or admin layout

export default function Layout({ isadmin = false, children }) {
  return isadmin ? (
    <AdminLayout>{children}</AdminLayout>
  ) : (
    <StudentLayout>{children}</StudentLayout>
  );
}
