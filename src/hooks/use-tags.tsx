
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Tag {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
}

export const useTags = () => {
  const queryClient = useQueryClient();

  const fetchTags = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from("tags")
      .select("*")
      .eq("user_id", user.id)
      .order("name", { ascending: true });

    if (error) throw error;
    return data as Tag[];
  };

  const { data: tags = [], isLoading, error } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  const createTagMutation = useMutation({
    mutationFn: async (name: string) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Not authenticated");

        const { data, error } = await supabase
            .from("tags")
            .insert({
                user_id: user.id,
                name: name.trim(),
            })
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tags"] });
        toast.success("Tag added successfully");
    },
    onError: (error: any) => {
        if (error.code === '23505') {
            toast.error("Tag already exists");
        } else {
            toast.error(error.message || "Failed to add tag");
        }
    }
  });

  const deleteTagMutation = useMutation({
      mutationFn: async (id: string) => {
          const { error } = await supabase
              .from("tags")
              .delete()
              .eq("id", id);
          if (error) throw error;
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["tags"] });
          toast.success("Tag deleted");
      },
      onError: (error: any) => {
          toast.error(error.message || "Failed to delete tag");
      }
  });

  return {
    tags,
    isLoading,
    error,
    createTag: createTagMutation.mutateAsync,
    deleteTag: deleteTagMutation.mutateAsync,
    isCreating: createTagMutation.isPending,
  };
};
