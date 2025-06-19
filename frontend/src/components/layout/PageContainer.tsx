import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function PageContainer() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="w-full p-4 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
