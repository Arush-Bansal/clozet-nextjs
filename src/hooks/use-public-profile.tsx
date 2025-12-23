
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const usePublicProfile = (username: string | undefined) => {
  const fetchProfile = async () => {
    if (!username) return null;
    
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username.toLowerCase())
      .single();

    if (error) throw error;
    return data;
  };

  const { data: profile, isLoading: isProfileLoading, error: profileError } = useQuery({
    queryKey: ["publicProfile", username],
    queryFn: fetchProfile,
    enabled: !!username,
  });

  const fetchProducts = async () => {
    if (!profile?.id) return [];

    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        product_tags (
          tags (
            id,
            name
          )
        )
      `)
      .eq("user_id", profile.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  };

  const { data: products = [], isLoading: isProductsLoading, error: productsError } = useQuery({
    queryKey: ["publicProducts", profile?.id],
    queryFn: fetchProducts,
    enabled: !!profile?.id,
  });

  return {
    profile,
    products,
    isLoading: isProfileLoading || isProductsLoading,
    error: profileError || productsError,
  };
};
