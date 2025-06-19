import { Routes, Route, Navigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import AuthRoute from "../components/auth/AuthRoute";
import { UserRole } from "../types/global";
import ApplicationLayout from "./calls/apply/ApplicationLayout";
import Step1_CallInfo from "./calls/apply/Step1_CallInfo";
import Step2_Upload from "./calls/apply/Step2_Upload";
import Step3_Review from "./calls/apply/Step3_Review";
import Step4_Submit from "./calls/apply/Step4_Submit";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import CallsPage from "./CallsPage";
import AboutPage from "./AboutPage";
import DashboardPage from "./DashboardPage";
import CallManagementPage from "./CallManagementPage";
import CallApplicationsPage from "./CallApplicationsPage";
import CallPreviewPage from "./CallPreviewPage";
import CallDetailPage from "./CallDetailPage";
import ReviewPage from "./ReviewPage";
import NotFoundPage from "./NotFoundPage";
import MyApplicationsPage from "./MyApplicationsPage";
import ReviewerPage from "./ReviewerPage";

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
