import { Routes, Route } from "react-router-dom";

// Middlewares
import PermissionMiddleware from "./middlewares/PermissionMiddleWare";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
// import {
//   Home,
//   GenerateInvoicePage,
//   AdminHome,
//   StudentsPage,
//   ResultPage,
//   StaffPage,
//   ParentPage,
//   TransactionHistory,
//   TuitionPage,
//   SessionTermPage,
//   AllStaffPage,
//   ResultsViewPage,
//   ResultSinglePage,
//   MyProfilePage,
//   UploadResultPage,
//   NotFound,
//   GeneralNotFound,
//   ClassesPage,
//   ClassPage,
//   CreateNewStaff,
//   CreateNewStudent,
//   NewInvoicePage,
//   InvoicePage,
//   StudentPage,
//   AccessRestricted,
//   StaffRoles,
//   NotificationsPage,
//   AllFeesPage,
//   ResultSettingsPage,
// } from "./pages/";

// Screens
import { PrintInvoiceScreen, LoginScreen } from "./screens";

// import AllEventsPage from "./pages/admin/events";
// import FinancePage from "./pages/admin/finance/";
// import EditStudentPage from "./pages/admin/students/EditStudent";
// import SubjectsPage from "./pages/admin/subjects";
// import EditSubjectPage from "./pages/admin/subjects/EditSubject.page";
// import NewSubjectPage from "./pages/admin/subjects/NewSubject";

// Admin Pages
import {
  AdminHome,
  AdminProfilePage,
  AllEventsPage,
  AllFeesPage,
  AllStaffPage,
  ClassPage,
  ClassResultsPage,
  ClassesPage,
  EditStudentPage,
  EditSubjectPage,
  FinancePage,
  InvoicePage,
  NewInvoicePage,
  NewStaffPage,
  NewStudentPage,
  NewSubjectPage,
  NotFoundPage,
  NotificationsPage,
  ParentPage,
  ParentsPage,
  StaffPage,
  StaffRolesPage,
  StudentPage,
  StudentsPage,
  SubjectsPage,
  TransactionHistoryPage,
} from "./pages/admin";

import { Navigate } from "react-router-dom";

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
        <Route path="profile" element={<AdminProfilePage />} />

        <Route path="students">
          <Route index element={<StudentsPage />} />
          <Route path="new" element={<NewStudentPage />} />
          <Route path=":studentId">
            <Route index element={<StudentPage />} />
            <Route path="edit" element={<EditStudentPage />} />
          </Route>
        </Route>
        <Route path="staff">
          <Route index element={<AllStaffPage />} />
          <Route path="new" element={<NewStaffPage />} />
          <Route path="roles" element={<StaffRolesPage />} />
          <Route path=":staffId" element={<StaffPage />} />
        </Route>

        <Route path="parents">
          <Route index element={<ParentsPage />} />
          <Route path=":parentId" element={<ParentPage />} />
        </Route>

        <Route path="classes">
          <Route index element={<ClassesPage />} />
          <Route path=":schoolClass" element={<ClassPage />} />
        </Route>

        <Route path="results">
          <Route index element={<ClassResultsPage />} />
          <Route path="view" element={<ResultsViewPage />} />
          <Route path="upload" element={<UploadResultPage />} />
          <Route path="settings" element={<ResultSettingsPage />} />
          <Route path=":session/:term/:userId" element={<ResultSinglePage />} />
        </Route>

        <Route path="subjects">
          <Route index element={<SubjectsPage />} />
          <Route path="new" element={<NewSubjectPage />} />
          <Route path=":subjectId/edit" element={<EditSubjectPage />} />
        </Route>

        <Route path="events">
          <Route index element={<AllEventsPage />} />
        </Route>

        <Route path="finance">
          <Route index element={<FinancePage />} />
          <Route path="fees" element={<AllFeesPage />} />
        </Route>

        <Route path="transactions">
          <Route index element={<TransactionHistoryPage />} />

          <Route path=":transactionID">
            <Route index element={<TransactionHistoryPage />} />
            {/* <Route path="invoice" element={<InvoicesPage />} /> */}
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
        <Route index element={<Home />} />

        {/* Invoices */}
        <Route path="invoices">
          <Route index element={<TuitionPage />} />
          <Route path="new" element={<GenerateInvoicePage />} />
          <Route path=":invoiceID" element={<PrintInvoiceScreen />} />
        </Route>
      </Route>

      <Route path="/restricted-access" element={<AccessRestricted />} />
      <Route path="*" element={<GeneralNotFound />} />
    </Routes>
  );
};

export default App;
