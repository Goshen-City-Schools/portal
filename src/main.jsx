import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, createBrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import LoginPage from './pages/auth/login.jsx';
import GenerateInvoicePage from './pages/payments/GenerateInvoice.page';
import InvoicesPage from './pages/payments/Invoices.page';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fees">
          <Route path="invoices" element={<InvoicesPage />}>
            <Route path="new" element={<GenerateInvoicePage />} />
          </Route>
        </Route>
        <Route path="/auth" element={<LoginPage />}>
          <Route path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
