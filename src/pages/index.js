import AccessRestricted from "./AccessRestricted";
import Home from "./Home";
import GeneralNotFound from "./NotFound";
import AdminHome from "./admin/Home";
import NotFound from "./admin/NotFound";
import ClassPage from "./admin/classes/Class.page";
import ClassesPage from "./admin/classes/Index.page";
import SessionTermPage from "./admin/configs/SessionTerm";
import TransactionHistory from "./admin/finance/TransactionHistory.page";
import TuitionPage from "./admin/finance/Tuition.page";
import AllFeesPage from "./admin/finance/fees/ManageFees";
import NewInvoicePage from "./admin/finance/invoices/New";
import { InvoicePage } from "./admin/finance/invoices/invoice";
import NotificationsPage from "./admin/notifications";
import ParentPage from "./admin/parents";
import MyProfilePage from "./admin/profile";
import ResultSinglePage from "./admin/results/Result.page";
import ResultSettingsPage from "./admin/results/ResultSettings.page";
import ResultPage from "./admin/results/Results.page";
import ResultsViewPage from "./admin/results/ResultsViewPage";
import UploadResultPage from "./admin/results/UploadResult.page";
import CreateNewStaff from "./admin/staff/CreateNewStaff.page";
import StaffRoles from "./admin/staff/Roles";
import StaffPage from "./admin/staff/Staff.page";
import AllStaffPage from "./admin/staff/index.page";
import CreateNewStudent from "./admin/students/CreateNewStudent.page";
import StudentPage from "./admin/students/Student.page";
import StudentsPage from "./admin/students/index.page";
import GenerateInvoicePage from "./payments/GenerateInvoice.page";
import ReceiptsPage from "./payments/Receipts.page";

export {
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
  AllStaffPage,
  ResultSettingsPage,
};
