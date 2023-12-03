import { Routes, Route } from "react-router-dom";

// Middlewares
import PermissionMiddleware from "./middlewares/PermissionMiddleWare";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";

// Pages
import Home from "./pages/Home";
import GenerateInvoicePage from "./pages/payments/GenerateInvoice.page";
import ReceiptsPage from "./pages/payments/Receipts.page";
import AdminHome from "./pages/admin/Home";
import StudentsPage from "./pages/admin/students/index.page";
import AllStaffPage from "./pages/admin/staff/index.page";
import ResultPage from "./pages/admin/results/Results.page";
import ParentPage from "./pages/admin/parents";
import TransactionHistory from "./pages/admin/finance/TransactionHistory.page";
import TuitionPage from "./pages/admin/finance/Tuition.page";
import SessionTermPage from "./pages/admin/configs/SessionTerm";
import ResultsViewPage from "./pages/admin/results/ResultsViewPage";
import ResultSinglePage from "./pages/admin/results/Result.page";
import ResultSettingsPage from "./pages/admin/results/ResultSettings.page";
import MyProfilePage from "./pages/admin/profile";
import UploadResultPage from "./pages/admin/results/UploadResult.page";
import NotFound from "./pages/admin/NotFound";
import GeneralNotFound from "./pages/NotFound";
import ClassesPage from "./pages/admin/classes/Index.page";
import ClassPage from "./pages/admin/classes/Class.page";
import CreateNewStaff from "./pages/admin/staff/CreateNewStaff.page";
import CreateNewStudent from "./pages/admin/students/CreateNewStudent.page";
import NewInvoicePage from "./pages/admin/finance/invoices/New";
import { InvoicePage } from "./pages/admin/finance/invoices/invoice";
import StudentPage from "./pages/admin/students/Student.page";
import StaffPage from "./pages/admin/staff/Staff.page";
import AccessRestricted from "./pages/AccessRestricted";
import StaffRoles from "./pages/admin/staff/Roles";
import NotificationsPage from "./pages/admin/notifications";
import ManageFees from "./pages/admin/finance/fees/ManageFees";

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

      <Route
        path="/admin"
        element={
          <PermissionMiddleware>
            <AdminLayout />
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
          <Route path="fees" element={<ManageFees />} />
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

      <Route
        path="/"
        element={
          <PermissionMiddleware>
            <StudentLayout />
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
