"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomeContent } from "@/components/ui/dashboard/home-content";
import { InboxContent } from "@/components/ui/dashboard/inbox-content";

const queryClient = new QueryClient();

type MenuKey = "home" | "inbox" | "calendar" | "search" | "settings";

export default function DashboardLayout() {
  const [activeMenu, setActiveMenu] = useState<MenuKey>("home");

  const renderContent = () => {
    switch (activeMenu) {
      case "home":
        return <HomeContent />;
      case "inbox":
        return <InboxContent />;
      //   case "calendar":
      //     return <CalendarContent />;
      //   case "search":
      //     return <SearchContent />;
      //   case "settings":
      //     return <SettingsContent />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <div className="flex min-h-screen">
          {/* Sidebar on the left */}
          <AppSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

          {/* Main content */}
          <SidebarInset>
            <div className="flex flex-col w-full h-full">
              <header className="flex h-12 items-center gap-2 px-4 border-b">
                <SidebarTrigger />
                <span className="font-medium">Dashboard</span>
              </header>

              <div className="flex-1 overflow-auto p-4">{renderContent()}</div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
