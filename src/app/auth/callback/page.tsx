"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get("code");
        
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          
          if (error) {
            console.error("Error exchanging code:", error);
            toast.error("Failed to verify email. The link may have expired.");
            router.push("/auth");
            return;
          }

          toast.success("Email verified successfully!");
          
          // Check if user has a username
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            const { data: profile } = await supabase
              .from("profiles")
              .select("username")
              .eq("id", user.id)
              .maybeSingle();

            if (profile?.username) {
              router.push("/dashboard");
            } else {
              router.push("/username");
            }
          } else {
             router.push("/auth");
          }
        } else {
          router.push("/auth");
        }
      } catch (error) {
        console.error("Callback error:", error);
        toast.error("An error occurred during verification.");
        router.push("/auth");
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Verifying your email...</h1>
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <p className="text-gray-500 mt-4">Please wait while we confirm your account.</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Loading...</h1>
            <div className="flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
