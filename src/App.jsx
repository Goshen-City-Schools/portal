import React from 'react';
import { RouterProvider } from 'react-router-dom';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from 'react-router-dom';

// layouts

// pages
import Home from './pages/Home';
import InvoicesPage from './pages/payments/Invoices.page';
import GenerateInvoicePage from './pages/payments/GenerateInvoice.page';
import ReceiptsPage from './pages/payments/Receipts';
import PrintReceiptPage from './pages/payments/PrintReceipt.page';
import LoginPage from './pages/auth/login';
import Layout from './layouts';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Home Route */}
      <Route index element={<Home />} />

      {/* Fees Routes */}
      <Route path="/fees">
        {/* Invoices */}
        <Route path="invoices">
          <Route index element={<InvoicesPage />} />
          <Route path="new" element={<GenerateInvoicePage />} />
        </Route>

        {/* Receipts */}
        <Route path="receipts">
          <Route index element={<ReceiptsPage />} />
          <Route path="new" element={<PrintReceiptPage />} />
        </Route>
      </Route>

      {/* Auth Routes */}
      <Route path="/auth" element={<LoginPage />}>
        <Route path="*" />
      </Route>
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
