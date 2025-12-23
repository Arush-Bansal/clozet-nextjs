"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useProfile } from "@/hooks/use-profile";
import { Loader2, Instagram, CheckCircle2 } from "lucide-react";

const RESERVED_USERNAMES = ["dashboard", "auth", "blogs", "blog", "username", "settings", "integrations", "profile", "links", "products", "u", "admin", "api", "clozet", "grifi", "main", "home"];

export default function UsernameClaimPage() {
  const [username, setUsername] = useState("");
  const [instagram, setInstagram] = useState("");
  const router = useRouter();
  const { profile, isLoading: profileLoading, claimUsername, isClaiming } = useProfile();

  useEffect(() => {
    if (profile) {
      if (profile.username) setUsername(profile.username);
      if (profile.instagram_username) setInstagram(profile.instagram_username);
    }
  }, [profile]);

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    const lowerUsername = username.toLowerCase();
    
    if (RESERVED_USERNAMES.includes(lowerUsername)) {
      toast.error("This username is reserved. Please pick another one.");
      return;
    }

    try {
      // Check if username is already taken
      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", lowerUsername)
        .maybeSingle();

      if (existing && existing.id !== profile?.id) {
        toast.error("Username is already taken. Try another one.");
        return;
      }

      await claimUsername({ 
        username: lowerUsername, 
        instagram_username: instagram 
      });

      router.push("/dashboard");
    } catch (error: any) {
      // Error is handled in mutation
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-serif font-bold">Claim Your Username</CardTitle>
          <CardDescription className="text-base mt-2">
            This will be your unique URL on clozet.life
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleClaim}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-semibold text-gray-700">Choose Username</Label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium group-focus-within:text-primary transition-colors">
                  clozet.life/
                </div>
                <Input
                  id="username"
                  placeholder="yourname"
                  className="pl-[104px] h-12 text-lg border-gray-200 focus:border-primary focus:ring-primary/20 transition-all rounded-xl"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ""))}
                  required
                />
              </div>
              <p className="text-xs text-gray-500">Only letters, numbers, underscores, and hyphens.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram" className="text-sm font-semibold text-gray-700">Instagram Account (Optional)</Label>
              <div className="relative group">
                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                <Input
                  id="instagram"
                  placeholder="your_insta_handle"
                  className="pl-10 h-12 text-lg border-gray-200 focus:border-primary focus:ring-primary/20 transition-all rounded-xl"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value.replace(/@/g, ""))}
                />
              </div>
              <p className="text-xs text-gray-500">Adding your Instagram helps us verify your identity.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full h-12 text-lg font-semibold rounded-xl" disabled={isClaiming || !username}>
              {isClaiming ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <CheckCircle2 className="mr-2 h-5 w-5" />}
              Claim & Continue
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
