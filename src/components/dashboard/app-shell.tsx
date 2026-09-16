"use client";

import { useState } from "react";
import { Bell, Menu, Search } from "lucide-react";

import { Brand } from "@/components/dashboard/brand";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-full bg-background">
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar p-4 lg:flex lg:flex-col">
        <Brand />
        <div className="mt-8 flex-1">
          <SidebarNav />
        </div>
        <p className="text-xs text-muted-foreground">Tonight · 9 screens open</p>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md sm:px-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="lg:hidden" />
              }
            >
              <Menu className="size-4" />
              <span className="sr-only">Open navigation</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-sidebar p-4">
              <SheetHeader className="p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <Brand />
              </SheetHeader>
              <div className="mt-6">
                <SidebarNav onNavigate={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>

          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search titles, bookings, or screens"
              className="pl-8"
              aria-label="Search"
            />
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="size-4" />
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar className="size-8">
            <AvatarFallback className="bg-muted text-xs">RM</AvatarFallback>
          </Avatar>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
