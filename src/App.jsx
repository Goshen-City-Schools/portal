import React from 'react';
import { RouterProvider } from 'react-router-dom';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

// layouts

// pages
import Home from './pages/Home';
import InvoicesPage from './pages/payments/Invoices.page';
import GenerateInvoicePage from './pages/payments/GenerateInvoice.page';
import ReceiptsPage from './pages/payments/Receipts';
import LoginPage from './pages/auth/login';
import Layout from './layouts';
import PrintReceiptScreen from './screens/PrintReceipt.screen';
import PrintInvoiceScreen from './screens/PrintInvoice.screen';

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
          <Route path=":invoiceID" element={<PrintInvoiceScreen />} />
        </Route>

        {/* Receipts */}
        <Route path="receipts">
          <Route index element={<ReceiptsPage />} />
          <Route path="new" element={<PrintReceiptScreen />} />
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
