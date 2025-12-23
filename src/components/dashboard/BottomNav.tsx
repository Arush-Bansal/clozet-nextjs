"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  Puzzle, 
  User,
  ExternalLink
} from "lucide-react";
import { useProfile } from "@/hooks/use-profile";

const menuItems = [
  { icon: LayoutDashboard, label: "Home", href: "/dashboard" },
  { icon: Package, label: "Products", href: "/dashboard/products" },
  { icon: Puzzle, label: "Integrations", href: "/dashboard/integrations" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
];

const BottomNav = () => {
  const pathname = usePathname();
  const { profile } = useProfile();
  const username = profile?.username;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 pb-safe">
      <nav className="flex items-center justify-around h-16">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center min-w-[64px] h-full transition-colors",
                isActive ? "text-primary" : "text-gray-400"
              )}
            >
              <item.icon className={cn("h-6 w-6 mb-1", isActive ? "text-primary" : "text-gray-400")} />
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
            </Link>
          );
        })}
        {username && (
          <a
            href={`/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center min-w-[64px] h-full transition-colors text-primary font-medium"
          >
            <ExternalLink className="h-6 w-6 mb-1" />
            <span className="text-[10px] leading-none">My Page</span>
          </a>
        )}
      </nav>
    </div>
  );
};

export default BottomNav;
