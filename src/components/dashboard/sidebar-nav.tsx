"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Clapperboard,
  LayoutDashboard,
  CalendarClock,
  Ticket,
  MonitorPlay,
  BarChart3,
} from "lucide-react";

import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/now-showing", label: "Now showing", icon: Clapperboard },
  { href: "/showtimes", label: "Showtimes", icon: CalendarClock },
  { href: "/bookings", label: "Bookings", icon: Ticket },
  { href: "/screens", label: "Screens", icon: MonitorPlay },
  { href: "/reports", label: "Reports", icon: BarChart3 },
];

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1" aria-label="Main">
      {links.map((link) => {
        const Icon = link.icon;
        const active =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="size-4" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
