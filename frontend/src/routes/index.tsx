import { Routes, Route, Navigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import AuthRoute from "../components/auth/AuthRoute";
import { UserRole } from "../types/global";
import ApplicationLayout from "../components/layout/ApplicationLayout";
import Step1_CallInfo from "../pages/calls/apply/Step1_CallInfo";
import Step2_Upload from "../pages/calls/apply/Step2_Upload";
import Step3_Review from "../pages/calls/apply/Step3_Review";
import Step4_Submit from "../pages/calls/apply/Step4_Submit";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CallsPage from "../pages/CallsPage";
import AboutPage from "../pages/AboutPage";
import DashboardPage from "../pages/DashboardPage";
import CallManagementPage from "../pages/CallManagementPage";
import CallApplicationsPage from "../pages/CallApplicationsPage";
import CallPreviewPage from "../pages/CallPreviewPage";
import CallDetailPage from "../pages/CallDetailPage";
import ReviewPage from "../pages/ReviewPage";
import NotFoundPage from "../pages/NotFoundPage";
import MyApplicationsPage from "../pages/MyApplicationsPage";
import ReviewerPage from "../pages/ReviewerPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/review/:reviewId" element={<ReviewPage />} />
      <Route path="/" element={<PageContainer />}>
        <Route index element={<CallsPage />} />
        <Route path="calls" element={<CallsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route element={<AuthRoute roles={[UserRole.admin, UserRole.super_admin]} />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="calls/manage" element={<CallManagementPage />} />
          <Route path="calls/:callId/applications" element={<CallApplicationsPage />} />
        </Route>
        <Route path="calls/:callId" element={<CallDetailPage />} />
        <Route path="calls/:callId/preview" element={<CallPreviewPage />} />
        <Route element={<AuthRoute roles={[UserRole.applicant]} />}>
          <Route path="my-applications" element={<MyApplicationsPage />} />
        </Route>
        <Route element={<AuthRoute roles={[UserRole.reviewer]} />}>
          <Route path="reviewer" element={<ReviewerPage />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="calls/:callId/apply" element={<ApplicationLayout />}>
            <Route index element={<Navigate to="step1" replace />} />
            <Route path="step1" element={<Step1_CallInfo />} />
            <Route path="step2" element={<Step2_Upload />} />
            <Route path="step3" element={<Step3_Review />} />
            <Route path="step4" element={<Step4_Submit />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
