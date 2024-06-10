import { Routes, Route } from "react-router-dom";

// Middlewares
import PermissionMiddleware from "./middlewares/PermissionMiddleWare";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";

// Admin Pages
import {
  //
  AdminHome,
  AdminProfilePage,
  //
  AllEventsPage,
  //
  AllStaffPage,
  NewStaffPage,
  //
  ClassesPage,
  ClassPage,
  ClassResultsPage,
  //
  StudentsPage,
  EditStudentPage,
  NewStudentPage,
  StudentPage,
  //
  ParentsPage,
  ParentPage,
  NewParentPage,
  //
  SubjectsPage,
  EditSubjectPage,
  NewSubjectPage,
  NotificationsPage,
  //
  FinancePage,
  InvoicePage,
  TransactionHistoryPage,
  NewInvoicePage,

  //
  NotFoundPage,
  EditStaffPage,
  ConfigPage,
  AcademicsConfigPage,
  StaffRolesConfigPage,
  EvaluationConfigPage,
  StaffPage,
} from "./pages/admin";

// User pages
import { FeesPage, TransactionsPage, UserHome } from "./pages/user";

// Shared pages
import { AccessRestricted, GeneralNotFound, LoginPage } from "./pages/shared";

import { Navigate } from "react-router-dom";
import PaymentsConfigPage from "./pages/admin/configs/PaymentsConfig.page";
import WriteDashboard from "./pages/admin/write";
import WebsiteConfigPage from "./pages/admin/configs/WebsiteConfig.page";
import FeespPage from "./pages/admin/finance/fees";
import UserInvoicePage from "./pages/user/payments/invoices/invoice";
import SearchResultPage from "./pages/admin/results/SearchResult";
import UploadResultPage from "./pages/admin/results/UploadResult.page";
import StudentResultsPage from "./pages/admin/results/StudentResults.page";
import ELibraryPage from "./pages/admin/eLibrary";

const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<LoginPage />} />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <PermissionMiddleware>
            <DashboardLayout />
          </PermissionMiddleware>
        }
      >
        {/* Home Route */}

        <Route index element={<AdminHome />} />
        <Route path="home" element={<AdminHome />} />
        <Route path="profile" element={<AdminProfilePage />} />

        <Route path="students">
          <Route index element={<StudentsPage />} />
          <Route path="new" element={<NewStudentPage />} />
          <Route path=":studentId">
            <Route index element={<StudentPage />} />
            <Route path="edit" element={<EditStudentPage />} />
          </Route>
        </Route>

        <Route path="parents">
          <Route index element={<ParentsPage />} />
          <Route path="new" element={<NewParentPage />} />
          <Route path=":parentId" element={<ParentPage />} />
        </Route>

        <Route path="results">
          <Route index element={<SearchResultPage />} />
          {/* <Route path="view" element={<ResultsViewPage />} /> */}
          <Route path="new" element={<UploadResultPage />} />
          <Route path=":schoolClass" element={<ClassResultsPage />} />
          <Route
            path=":schoolClass/:studentId"
            element={<StudentResultsPage />}
          />
          {/* <Route path=":session/:term/:portalId" element={<ResultSinglePage />} /> */}
        </Route>

        {/* The Config Routes serves like the frontend backend for the Admin */}
        <Route path="config">
          <Route index element={<ConfigPage />} />

          {/* Staff Config */}
          <Route path="staff">
            <Route index element={<AllStaffPage />} />
            <Route path="new" element={<NewStaffPage />} />
            <Route path="roles" element={<StaffRolesConfigPage />} />
            <Route path=":staffId">
              <Route index element={<StaffPage />} />
              <Route path="edit" element={<EditStaffPage />} />
            </Route>
          </Route>

          {/* Class Config */}
          <Route path="classes">
            <Route index element={<ClassesPage />} />
            <Route path=":classId">
              <Route index element={<ClassPage />} />
            </Route>
          </Route>

          {/* Config */}
          <Route path="website" element={<WebsiteConfigPage />} />
          <Route path="academics" element={<AcademicsConfigPage />} />
          <Route path="payments" element={<PaymentsConfigPage />} />
          <Route path="evaluation" element={<EvaluationConfigPage />} />
          <Route path="promotion" element={<AcademicsConfigPage />} />
          <Route path="messaging" element={<AcademicsConfigPage />} />

          <Route path="subjects">
            <Route index element={<SubjectsPage />} />
            <Route path="new" element={<NewSubjectPage />} />
            <Route path=":subjectId/edit" element={<EditSubjectPage />} />
          </Route>
        </Route>

        {/* Single Staff Page */}
        <Route path="staff/:staffId" element={<StaffPage />} />

        {/* Events routes */}
        <Route path="events">
          <Route index element={<AllEventsPage />} />
        </Route>

        <Route path="finance">
          <Route index element={<FinancePage />} />
          <Route path="fees" element={<FeespPage />} />

          <Route path="transactions">
            <Route index element={<TransactionHistoryPage />} />

            <Route path=":transactionID">
              <Route index element={<TransactionHistoryPage />} />
              {/* <Route path="invoice" element={<InvoicesPage />} /> */}
            </Route>
          </Route>
        </Route>

        <Route path="notifications">
          <Route index element={<NotificationsPage />} />
        </Route>

        <Route path="invoices">
          <Route
            index
            element={<Navigate to={"/admin/transactions"} replace={true} />}
          />
          <Route path="new" element={<NewInvoicePage />} />
          <Route path=":invoiceID" element={<InvoicePage />} />
        </Route>

        {/* Write */}
        <Route path="write">
          <Route index element={<WriteDashboard />} />
        </Route>

        {/* Write */}
        <Route path="eLibrary">
          <Route index element={<ELibraryPage />} />
        </Route>

        <Route path="articles">
          <Route index element={<Navigate to={"/write"} replace="true" />} />
          <Route path="new" element={<NewInvoicePage />} />
          <Route path=":invoiceID" element={<InvoicePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* User */}
      <Route
        path="/"
        element={
          <PermissionMiddleware>
            <DashboardLayout />
          </PermissionMiddleware>
        }
      >
        {/* Home Route */}
        <Route index element={<UserHome />} />

        {/* Fees */}
        <Route path="fees">
          <Route index element={<FeesPage />} />
          {/* <Route path=":feeTypeID" element={<FeesPage />} /> */}
        </Route>

        {/* Invoices */}
        <Route path="invoices">
          <Route index element={<UserInvoicePage />} />
          <Route path=":invoiceId" element={<UserInvoicePage />} />
        </Route>

        {/* Transactions */}
        <Route path="transactions">
          <Route index element={<TransactionsPage />} />
          {/* <Route path=":feeTypeID" element={<FeesPage />} /> */}
        </Route>
      </Route>

      <Route path="/restricted-access" element={<AccessRestricted />} />
      <Route path="*" element={<GeneralNotFound />} />
    </Routes>
  );
};

export default App;
