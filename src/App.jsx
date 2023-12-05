import { Routes, Route } from "react-router-dom";

// Middlewares
import PermissionMiddleware from "./middlewares/PermissionMiddleWare";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import {
  Home,
  GenerateInvoicePage,
  ReceiptsPage,
  AdminHome,
  StudentsPage,
  ResultPage,
  StaffPage,
  ParentPage,
  TransactionHistory,
  TuitionPage,
  SessionTermPage,
  AllStaffPage,
  ResultsViewPage,
  ResultSinglePage,
  MyProfilePage,
  UploadResultPage,
  NotFound,
  GeneralNotFound,
  ClassesPage,
  ClassPage,
  CreateNewStaff,
  CreateNewStudent,
  NewInvoicePage,
  InvoicePage,
  StudentPage,
  AccessRestricted,
  StaffRoles,
  NotificationsPage,
  AllFeesPage,
  ResultSettingsPage,
} from "./pages/";

// Screens
import PrintReceiptScreen from "./screens/PrintReceipt.screen";
import PrintInvoiceScreen from "./screens/PrintInvoice.screen";
import LoginScreen from "./screens/Login.screen";
import AllEventsPage from "./pages/admin/events";
import FinancePage from "./pages/admin/finance/";
import EditStudentPage from "./pages/admin/students/EditStudent";
import SubjectsPage from "./pages/admin/subjects";
import EditSubject from "./pages/admin/subjects/EditSubject";
import NewSubjectPage from "./pages/admin/subjects/NewSubject";

const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<LoginScreen />} />

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
        <Route path="profile" element={<MyProfilePage />} />

        <Route path="students">
          <Route index element={<StudentsPage />} />
          <Route path="new" element={<CreateNewStudent />} />
          <Route path=":studentId">
            <Route index element={<StudentPage />} />
            <Route path="edit" element={<EditStudentPage />} />
          </Route>
        </Route>
        <Route path="staff">
          <Route index element={<AllStaffPage />} />
          <Route path="new" element={<CreateNewStaff />} />
          <Route path="roles" element={<StaffRoles />} />
          <Route path=":staffId" element={<StaffPage />} />
        </Route>

        <Route path="parents" element={<ParentPage />} />
        <Route path="classes">
          <Route index element={<ClassesPage />} />
          <Route path=":schoolClass" element={<ClassPage />} />
        </Route>

        <Route path="results">
          <Route index element={<ResultPage />} />
          <Route path="view" element={<ResultsViewPage />} />
          <Route path="upload" element={<UploadResultPage />} />
          <Route path="settings" element={<ResultSettingsPage />} />
          <Route path=":session/:term/:userId" element={<ResultSinglePage />} />
        </Route>

        <Route path="subjects">
          <Route index element={<SubjectsPage />} />
          <Route path="new" element={<NewSubjectPage />} />
          <Route path=":subjectId/edit" element={<EditSubject />} />
        </Route>

        <Route path="events">
          <Route index element={<AllEventsPage />} />
        </Route>

        <Route path="finance">
          <Route index element={<FinancePage />} />
          <Route path="fees" element={<AllFeesPage />} />
        </Route>

        <Route path="transactions">
          <Route index element={<TransactionHistory />} />

          <Route path=":transactionID">
            <Route index element={<TransactionHistory />} />
            {/* <Route path="invoice" element={<InvoicesPage />} /> */}
          </Route>
        </Route>

        <Route path="notifications">
          <Route index element={<NotificationsPage />} />
        </Route>

        <Route path="receipts" element={<TuitionPage />} />

        <Route path="invoices">
          <Route index element={<TuitionPage />} />
          <Route path="new" element={<NewInvoicePage />} />
          <Route path=":invoiceID" element={<InvoicePage />} />
        </Route>

        <Route path="config">
          <Route index element={<SessionTermPage />} />
          <Route path="session-term" element={<SessionTermPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
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
        <Route index element={<Home />} />

        {/* Fees Routes */}
        <Route path="/fees">
          {/* Invoices */}
          <Route path="invoices">
            <Route index element={<TuitionPage />} />
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

      <Route path="/restricted-access" element={<AccessRestricted />} />
      <Route path="*" element={<GeneralNotFound />} />
    </Routes>
  );
};

export default App;
