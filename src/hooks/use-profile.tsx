
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ProfileData {
  id: string;
  username: string;
  avatar_url?: string;
  instagram_username?: string;
  display_name?: string;
  bio?: string;
  email?: string;
  created_at?: string;
}

export const useProfile = () => {
  const queryClient = useQueryClient();

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No user logged in");

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) throw error;
    return { ...data, email: user.email } as ProfileData & { email?: string };
  };

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData: Partial<ProfileData>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user logged in");

      const { data, error } = await supabase
        .from("profiles")
        .update(updatedData)
        .eq("id", user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
        queryClient.setQueryData(["profile"], data);
        toast.success("Profile updated successfully!");
    },
    onError: (error) => {
        toast.error((error as any).message || "Failed to update profile");
    }
  });

  const claimUsernameMutation = useMutation({
    mutationFn: async ({ username, instagram_username }: { username: string; instagram_username?: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user logged in");

      const { data, error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          username: username.toLowerCase(),
          instagram_username: instagram_username || null,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["profile"], data);
      toast.success("Username claimed successfully!");
    },
    onError: (error) => {
      toast.error((error as any).message || "Failed to claim username");
    }
  });

  return {
    profile,
    isLoading,
    error,
    updateProfile: updateProfileMutation.mutateAsync,
    isUpdating: updateProfileMutation.isPending,
    claimUsername: claimUsernameMutation.mutateAsync,
    isClaiming: claimUsernameMutation.isPending,
  };
};
