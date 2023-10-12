import React from "react";
import { RouterProvider } from "react-router-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// layouts

// pages
import Home from "./pages/Home";
import InvoicesPage from "./pages/payments/Invoices.page";
import GenerateInvoicePage from "./pages/payments/GenerateInvoice.page";
import ReceiptsPage from "./pages/payments/Receipts";
import PrintReceiptScreen from "./screens/PrintReceipt.screen";
import PrintInvoiceScreen from "./screens/PrintInvoice.screen";
import LoginScreen from "./screens/Login.screen";
import AdminHome from "./pages/admin/Home";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";
import LoadingScreen from "./screens/Loading.screen";
import defaultConfigValues from "./data/defaultConfigValues";
import StudentsPage from "./pages/admin/students/Students.page";
import StaffPage from "./pages/admin/staff/Staff.page";
import ResultPage from "./pages/admin/results/Results.page";

const user = defaultConfigValues.user;

const getLayoutForUser = () => {
  if (user) {
    if (user.userType == "Staff") {
      return <AdminLayout />;
    } else if (user.userType == "Student") {
      return <StudentLayout />;
    }
  }
  // If user data is not available or user type doesn't match, you can return a loading or authentication screen
  return <LoadingScreen />; // Replace 'LoadingScreen' with your loading screen component
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/auth" element={<LoginScreen />} />

      <Route path="/admin" element={getLayoutForUser()}>
        {/* Home Route */}

        <Route index element={<AdminHome />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="staff" element={<StaffPage />} />
        <Route path="results" element={<ResultPage />} />
      </Route>

      <Route path="/" element={getLayoutForUser()}>
        {/* Home Route */}
        <Route index element={<Home />} />

        {/* Fees Routes */}
        <Route path="/fees">
          {/* Invoices */}
          <Route path="invoices">
            <Route index element={<InvoicesPage />} />
            <Route path="new" element={<GenerateInvoicePage />} />
            <Route path=":invoiceID" element={<PrintInvoiceScreen />} />
          </Route>

          {/* Receipts */}
          <Route path="receipts">
            <Route index element={<ReceiptsPage />} />
            <Route path="new" element={<PrintReceiptScreen />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
