import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./context/ToastProvider";
import AppRoutes from "./routes";

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ToastProvider>
  );
}
