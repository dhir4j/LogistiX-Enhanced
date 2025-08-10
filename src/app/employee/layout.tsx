"use client";

import { SidebarProvider, Sidebar, SidebarHeader, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutDashboard, Book, FileUp, GitCompare, Scissors, Search, FileText, Printer, Send, Combine, User, Fuel, CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navLinks = [
    { href: '/employee/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/employee/booking', label: 'Booking', icon: Book },
    { href: '/employee/excel-import', label: 'Excel Import', icon: FileUp },
    { href: '/employee/rate-compare', label: 'Rate Compare', icon: GitCompare },
    { href: '/employee/day-end', label: 'Day End', icon: Scissors },
    { href: '/employee/tracking', label: 'Tracking', icon: Search },
    { href: '/employee/report', label: 'Report', icon: FileText },
    { href: '/employee/invoice-printing', label: 'Invoice Printing', icon: Printer },
    { href: '/employee/sender', label: 'Sender', icon: Send },
    { href: '/employee/receiver', label: 'Receiver', icon: Combine },
    { href: '/employee/user', label: 'User', icon: User },
    { href: '/employee/fuel-surcharge', label: 'Fuel Surcharge', icon: Fuel },
  ];

  return (
    <SidebarProvider>
      <Sidebar className="bg-gray-900 text-white" collapsible="icon">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
            <Image src="/images/logo/logo.png" alt="Logo" width={40} height={40} className="bg-white rounded-full p-1"/>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <h2 className="text-lg font-bold">Employee Panel</h2>
              <p className="text-xs text-gray-400">HK SPEED COURIERS</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {navLinks.map(link => (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname.startsWith(link.href)}
                  tooltip={{ children: link.label }}
                  className="data-[active=true]:bg-gray-700 hover:bg-gray-700/80"
                >
                  <Link href={link.href}>
                    <link.icon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">{link.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 bg-white border-b md:justify-end">
            <SidebarTrigger className="md:hidden" />
            <p className="text-sm font-medium">Welcome, Employee!</p>
        </header>
        <main className="flex-1 flex bg-gray-100">
            {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
