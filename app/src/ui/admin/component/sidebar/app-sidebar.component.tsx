"use client";

import * as React from "react";
import { BookOpen, Bot, Settings2, Sword } from "lucide-react";

import logo from "@/assets/image/exercise/default-level.png";

import { NavMain } from "@/ui/admin/component/sidebar/nav-main.component";
import { NavUser } from "@/ui/admin/component/sidebar/nav-user.component";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuthContext } from "@/hook/useAuthContext/useAuthContext.hook";
import { Link } from "react-router-dom";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { authUser } = useAuthContext();

  const data = {
    user: {
      name: authUser!.username,
      email: authUser!.email,
      avatar: authUser!.avatar,
    },
    navMain: [
      {
        title: "Challenges",
        url: "/admin/challenges",
        icon: Sword,
      },
      {
        title: "Models",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <Link to="/admin/dashboard">
        <SidebarHeader>
          <img className="w-full max-w-12" src={logo} alt="Logo do Slothify" />
        </SidebarHeader>
      </Link>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
