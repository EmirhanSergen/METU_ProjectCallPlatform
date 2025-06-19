import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoute from "./components/auth/AuthRoute";
import PageContainer from "./components/layout/PageContainer";
import { UserRole } from "./types/global";
import AboutPage from "./pages/AboutPage";
import CallApplicationsPage from "./pages/CallApplicationsPage";
import CallDetailPage from "./pages/CallDetailPage";
import CallManagementPage from "./pages/CallManagementPage";
import CallFormPage from "./pages/CallFormPage";
import CallPreviewPage from "./pages/CallPreviewPage";
import CallsPage from "./pages/CallsPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MyApplicationsPage from "./pages/MyApplicationsPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import ReviewPage from "./pages/ReviewPage";
import ReviewerPage from "./pages/ReviewerPage";
import ApplicationLayout from "./pages/calls/apply/ApplicationLayout";
import Step1_CallInfo from "./pages/calls/apply/Step1_CallInfo";
import Step2_Upload from "./pages/calls/apply/Step2_Upload";
import Step3_Review from "./pages/calls/apply/Step3_Review";
import Step4_Submit from "./pages/calls/apply/Step4_Submit";

const adminRoutes = (
  <Route element={<AuthRoute roles={[UserRole.admin, UserRole.super_admin]} />}>
    <Route path="dashboard" element={<DashboardPage />} />
    <Route path="calls/manage" element={<CallManagementPage />} />
    <Route path="calls/manage/new" element={<CallFormPage />} />
    <Route path="calls/manage/:callId" element={<CallFormPage />} />
    <Route path="calls/:callId/applications" element={<CallApplicationsPage />} />
  </Route>
);

const applicantRoutes = (
  <Route element={<AuthRoute roles={[UserRole.applicant]} />}>
    <Route path="my-applications" element={<MyApplicationsPage />} />
  </Route>
);

const reviewerRoutes = (
  <Route element={<AuthRoute roles={[UserRole.reviewer]} />}>
    <Route path="reviewer" element={<ReviewerPage />} />
  </Route>
);

const applicationRoutes = (
  <Route element={<AuthRoute roles={[UserRole.applicant]} />}>
    <Route path="calls/:callId/apply" element={<ApplicationLayout />}>
      <Route index element={<Navigate to="step1" replace />} />
      <Route path="step1" element={<Step1_CallInfo />} />
      <Route path="step2" element={<Step2_Upload />} />
      <Route path="step3" element={<Step3_Review />} />
      <Route path="step4" element={<Step4_Submit />} />
    </Route>
  </Route>
);

 export default function AppRoutes() {
   return (
     <Routes>
       <Route path="/login" element={<LoginPage />} />
       <Route path="/register" element={<RegisterPage />} />
       <Route path="/review/:reviewId" element={<ReviewPage />} />
       <Route path="/" element={<PageContainer />}>
         <Route index element={<HomePage />} />
         <Route path="calls" element={<CallsPage />} />
         <Route path="about" element={<AboutPage />} />
        {adminRoutes}
         <Route path="calls/:callId" element={<CallDetailPage />} />
         <Route path="calls/:callId/preview" element={<CallPreviewPage />} />
        {applicantRoutes}
        {reviewerRoutes}
        {applicationRoutes}
       </Route>
       <Route path="*" element={<NotFoundPage />} />
     </Routes>
   );
 }
