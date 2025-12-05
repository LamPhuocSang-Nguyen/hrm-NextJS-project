"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomeContent } from "@/components/ui/dashboard/home-content";
import { InboxContent } from "@/components/ui/dashboard/inbox-content";
import { SectionCards } from "@/components/ui/section-card";

const queryClient = new QueryClient();

type MenuKey = "card" | "home" | "inbox" | "calendar" | "search" | "settings";

export default function DashboardLayout() {
  const [activeMenu, setActiveMenu] = useState<MenuKey>("card");

  const renderContent = () => {
    switch (activeMenu) {
      case "card":
        return <SectionCards />;
      case "home":
        return <HomeContent />;
      case "inbox":
        return <InboxContent />;
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
        {/* Sidebar on the left */}
        <AppSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        {/* Main content fills remaining width */}
        <SidebarInset>
          <header>
            <SidebarTrigger />
            <span className="font-medium">Dashboard</span>
          </header>
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 ">
                {renderContent()}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
