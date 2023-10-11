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

const user = JSON.parse(localStorage.getItem("user"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/auth" element={<LoginScreen />} />

      <Route path="/admin">
        {/* Home Route */}
        <Route path="auth" element={<LoginScreen />} />

        <Route element={<AdminLayout />}>
          <Route index element={<AdminHome />} />{" "}
        </Route>
      </Route>

      <Route path="/" element={<StudentLayout />}>
        {/* Home Route */}
        <Route
          index
          element={user.userType == "Student" ? <Home /> : <AdminHome />}
        />

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
