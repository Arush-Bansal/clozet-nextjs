"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  Puzzle, 
  User, 
  LogOut,
  ChevronRight,
  ExternalLink
} from "lucide-react";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/hooks/use-profile";
import { toast } from "sonner";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Package, label: "Products", href: "/dashboard/products" },
  { icon: Puzzle, label: "Integrations", href: "/dashboard/integrations" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { profile } = useProfile();
  const username = profile?.username;


  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    } else {
      toast.success("Signed out successfully");
      router.push("/");
    }
  };

  return (
    <div className="hidden lg:flex flex-col w-64 bg-sidebar border-r border-sidebar-border h-screen sticky top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-serif font-bold text-primary">clozet.life</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-3.5 text-sm font-medium rounded-xl transition-all group",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-primary shadow-sm" 
                  : "text-sidebar-foreground/50 hover:bg-sidebar-accent/50 hover:text-sidebar-primary"
              )}
            >
              <div className="flex items-center">
                <item.icon className={cn("mr-3 h-5 w-5 transition-colors", isActive ? "text-sidebar-primary" : "text-sidebar-foreground/30 group-hover:text-sidebar-primary")} />
                {item.label}
              </div>
              {isActive && <ChevronRight className="h-4 w-4" />}
            </Link>
          );
        })}
      </nav>

       {username && (
          <div className="px-4 mt-auto mb-2">
            <a
              href={`/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3.5 text-sm font-semibold text-primary bg-primary/10 rounded-xl hover:bg-primary/20 transition-all border border-primary/20 group shadow-sm"
            >
              <div className="flex items-center">
                <ExternalLink className="mr-3 h-5 w-5" />
                Go to Page
              </div>
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
       )}

      <div className="p-4 border-t border-sidebar-border/50">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-sidebar-foreground/40 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all group"
        >
          <LogOut className="mr-3 h-5 w-5 transition-colors group-hover:text-red-500" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
