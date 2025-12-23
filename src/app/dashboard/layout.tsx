"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import BottomNav from "@/components/dashboard/BottomNav";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUsername = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", session.user.id)
        .maybeSingle();
      
      if (!profile?.username) {
        router.push("/username");
      } else {
        setLoading(false);
      }
    };
    checkUsername();
  }, [router]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <header className="lg:hidden bg-card border-b border-border px-4 py-3 sticky top-0 z-30">
            <div className="flex items-center justify-between">
              <span className="text-xl font-serif font-bold text-primary">clozet.life</span>
            </div>
          </header>

          <main className="flex-1 pb-20 lg:pb-0">
            <div className="container mx-auto p-4 lg:p-8">
              {children}
            </div>
          </main>
          <BottomNav />
        </div>
      </div>
    </ProtectedRoute>
  );
}
