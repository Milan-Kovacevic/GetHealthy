import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/pages/shared/navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="h-svh flex flex-col">
      <Navbar />
      <ScrollArea className="flex-1">
        <Outlet />
      </ScrollArea>
    </div>
  );
}
