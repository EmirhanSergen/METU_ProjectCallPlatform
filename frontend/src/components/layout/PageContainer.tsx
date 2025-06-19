import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function PageContainer() {
  const { pathname } = useLocation();
  const showSidebar = pathname.includes("/apply");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {showSidebar && <Sidebar />}
        <main className={`${showSidebar ? "flex-1" : "w-full"} p-4`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
