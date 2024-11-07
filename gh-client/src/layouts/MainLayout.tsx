import Navbar from "@/pages/shared/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="h-svh flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
