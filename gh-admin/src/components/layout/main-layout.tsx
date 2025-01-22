import { Breadcrumb } from "../breadcrumb";
import { Menu } from "../menu";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Outlet } from "react-router";
import { Toaster } from "sonner";

export const MainLayout: React.FC = () => {
  return (
    <SidebarProvider className="min-h-svh max-h-svh">
      <Menu />
      <Toaster position="bottom-right" />
      <SidebarInset className="min-h-svh max-h-svh">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb />
          </div>
        </header>
        <ScrollArea className="flex flex-1 flex-col gap-4 py-5 px-6">
          <Outlet />
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
};
