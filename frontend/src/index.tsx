import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoute from "./components/auth/AuthRoute";
import GuestRoute from "./components/auth/GuestRoute";
import PageContainer from "./components/layout/PageContainer";
import { UserRole } from "./types/global";
import AboutPage from "./pages/AboutPage";
import CallApplicationsPage from "./pages/CallApplicationsPage";
import CallDetailPage from "./pages/CallDetailPage";
import CallManagementPage from "./pages/CallManagementPage";
import CallFormPage from "./pages/CallFormPage";
import CallPage from "./pages/CallPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MyApplicationsPage from "./pages/MyApplicationsPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import ReviewPage from "./pages/ReviewPage";
import ReviewerPage from "./pages/ReviewerPage";
import SettingsPage from "./pages/SettingsPage";
import AdminUserManagementPage from "./pages/AdminUserManagementPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ApplicationLayout from "./pages/calls/apply/ApplicationLayout";
import Step1_CallInfo from "./pages/calls/apply/Step1_CallInfo";
import Step2_Upload from "./pages/calls/apply/Step2_ApplicantInfo";
import Step3_Review from "./pages/calls/apply/Step3_ApplicationDetails";
import Step4_Submit from "./pages/calls/apply/Step4_DocumentsUpload";
import Step5_AcademicPortfolio from "./pages/calls/apply/Step5_AcademicPortfolio";
import Step6_Mobility from "./pages/calls/apply/Step6_Mobility";
import Step7_ProposalCV from "./pages/calls/apply/Step7_ProposalCV";
import Step8_EthicsSecurity from "./pages/calls/apply/Step8_EthicsSecurity";
import Step9_ReviewSubmit from "./pages/calls/apply/Step9_ReviewSubmit";

const adminRoutes = (
  <Route element={<AuthRoute roles={[UserRole.admin, UserRole.super_admin]} />}>
    <Route path="dashboard" element={<DashboardPage />} />
    <Route path="call/manage" element={<CallManagementPage />} />
    <Route path="call/manage/new" element={<CallFormPage />} />
    <Route path="call/manage/:callId" element={<CallFormPage />} />
    <Route path="call/:callId/applications" element={<CallApplicationsPage />} />
  </Route>
);

const applicantRoutes = (
  <Route element={<AuthRoute roles={[UserRole.applicant]} />}>
    <Route path="applications/me" element={<MyApplicationsPage />} />
  </Route>
);

const reviewerRoutes = (
  <Route element={<AuthRoute roles={[UserRole.reviewer]} />}>
    <Route path="reviewer" element={<ReviewerPage />} />
  </Route>
);

const applicationRoutes = (
  <Route element={<AuthRoute roles={[UserRole.applicant]} />}>
    <Route path="call/:callId/apply" element={<ApplicationLayout />}>
      <Route index element={<Navigate to="step1" replace />} />
      <Route path="step1" element={<Step1_CallInfo />} />
      <Route path="step2" element={<Step2_Upload />} />
      <Route path="step3" element={<Step3_Review />} />
      <Route path="step4" element={<Step4_Submit />} />
      <Route path="step5" element={<Step5_AcademicPortfolio />} />
      <Route path="step6" element={<Step6_Mobility />} />
      <Route path="step7" element={<Step7_ProposalCV />} />
      <Route path="step8" element={<Step8_EthicsSecurity />} />
      <Route path="step9" element={<Step9_ReviewSubmit />} />
    </Route>
  </Route>
);

const accountRoutes = (
  <Route element={<AuthRoute />}>
    <Route path="settings" element={<SettingsPage />} />
  </Route>
);

const superAdminRoutes = (
  <Route element={<AuthRoute roles={[UserRole.super_admin]} />}>
    <Route path="admin/users" element={<AdminUserManagementPage />} />
  </Route>
);

 export default function AppRoutes() {
   return (
     <Routes>
       <Route path="/login" element={<LoginPage />} />
       <Route path="/register" element={<RegisterPage />} />
      <Route element={<AuthRoute roles={[UserRole.reviewer]} />}> 
      <Route path="/review/:reviewId" element={<ReviewPage />} />
    </Route>
      <Route path="/" element={<PageContainer />}>
        <Route element={<GuestRoute />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
        <Route path="call" element={<CallPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        {adminRoutes}
        {superAdminRoutes}
        <Route path="call/:callId" element={<CallDetailPage />} />
        {applicantRoutes}
        {reviewerRoutes}
        {applicationRoutes}
        {accountRoutes}
      </Route>
       <Route path="*" element={<NotFoundPage />} />
     </Routes>
   );
 }
