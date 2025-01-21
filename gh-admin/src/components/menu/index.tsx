import { useLogout, useMenu } from "@refinedev/core";
import { Button } from "../ui/button";
import { Link } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import appIcon from "@/assets/applogo.png";
import { ChartBarIcon, LogOutIcon } from "lucide-react";

export const Menu = () => {
  const { mutate: logout } = useLogout();
  const { menuItems, selectedKey } = useMenu();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/" className="flex gap-2 items-center p-0.5">
          <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <img src={appIcon} className="filter-white" alt="logo" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight">
              <span className="text-primary text-xl">Get</span>Healthy
            </span>
            <span className="text-sm text-muted-foreground leading-none">
              Admin
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Manage application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                return (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.key == selectedKey}
                    >
                      {!item.children?.length ? (
                        <Link className="" to={item.route ?? "/"}>
                          {item?.icon}
                          {item.label}
                        </Link>
                      ) : (
                        <span className="select-none">{item.label}</span>
                      )}
                    </SidebarMenuButton>
                    {item.children?.length ? (
                      <SidebarMenuSub>
                        {item.children.map((subitem) => (
                          <SidebarMenuSubItem key={subitem.key}>
                            <SidebarMenuSubButton
                              className="w-full"
                              asChild
                              isActive={subitem.key == selectedKey}
                            >
                              <Link
                                className="font-normal"
                                to={subitem.route ?? "/"}
                              >
                                {subitem?.icon}
                                {subitem.label}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    ) : null}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Other</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={false}
                disabled={true}
                className="bg-muted cursor-not-allowed"
              >
                <span className="select-none">
                  <ChartBarIcon />
                  Statistics
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={() => logout()}
          variant="outline"
          className="mx-2 my-2 border-primary/75 text-foreground/90 hover:border-primary"
        >
          <LogOutIcon />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
