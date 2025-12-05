import Link from "next/link";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { IconInnerShadowTop } from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/ui/navUser";
import { useTestAPI } from "@/hooks/test-api";

type MenuKey = "home" | "inbox" | "calendar" | "search" | "settings";

interface AppSidebarProps {
  activeMenu: MenuKey;
  setActiveMenu: (menu: MenuKey) => void;
}

// Menu items
const items: { title: string; key: MenuKey; icon: React.ElementType }[] = [
  { title: "Home", key: "home", icon: Home },
  { title: "Inbox", key: "inbox", icon: Inbox },
  { title: "Calendar", key: "calendar", icon: Calendar },
  { title: "Search", key: "search", icon: Search },
  { title: "Settings", key: "settings", icon: Settings },
];

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

export function AppSidebar({ activeMenu, setActiveMenu }: AppSidebarProps) {
  const { isLoading, isError, data, error } = useTestAPI();
  // const pathname = usePathname(); // ✔ SAFE
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  if (data) {
    user.name = data[1].name;
  }

  return (
    <Sidebar side="left">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Shinhan DS</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarMenu>
          <SidebarMenuItem>
            <NavUser user={user} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton asChild isActive={activeMenu === item.key}>
                    <button
                      className="flex items-center gap-2"
                      onClick={() => setActiveMenu(item.key)}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
