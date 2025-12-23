
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Product {
    id: string;
    title: string;
    price: number;
    image_url: string;
    is_sold: boolean;
    created_at: string;
    user_id: string;
    product_tags?: { tag_id: string }[];
}

export const useProducts = () => {
    const queryClient = useQueryClient();

    const fetchProducts = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
            .from("products")
            .select(`
                *,
                product_tags (
                    tag_id
                )
            `)
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (error) throw error;
        return data as Product[];
    };

    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });

    const deleteProductMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from("products")
                .delete()
                .eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product deleted");
        },
        onError: (error) => {
            toast.error((error as any).message || "Failed to delete product");
        }
    });

    const toggleStatusMutation = useMutation({
        mutationFn: async ({ id, isSold }: { id: string; isSold: boolean }) => {
            const { error } = await supabase
                .from("products")
                .update({ is_sold: isSold })
                .eq("id", id);
            if (error) throw error;
        },
        onSuccess: (_, { isSold }) => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success(isSold ? "Marked as sold" : "Marked as available");
        },
        onError: (error) => {
            toast.error((error as any).message || "Failed to update product status");
        }
    });

    const saveProductMutation = useMutation({
        mutationFn: async ({ id, title, price, image_url, is_sold, tags }: { id?: string, title: string, price: number, image_url: string, is_sold: boolean, tags: string[] }) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Not authenticated");

            let productId = id;

            if (id) {
                const { error: updateError } = await supabase
                    .from("products")
                    .update({ title, price, image_url, is_sold })
                    .eq("id", id);
                if (updateError) throw updateError;

                const { error: deleteTagsError } = await supabase
                    .from("product_tags")
                    .delete()
                    .eq("product_id", id);
                if (deleteTagsError) throw deleteTagsError;
            } else {
                const { data, error: insertError } = await supabase
                    .from("products")
                    .insert({ user_id: user.id, title, price, image_url, is_sold })
                    .select()
                    .single();
                if (insertError) throw insertError;
                productId = data.id;
            }

            if (tags.length > 0 && productId) {
                const productTags = tags.map(tagId => ({
                    product_id: productId,
                    tag_id: tagId
                }));
                const { error: tagError } = await supabase
                    .from("product_tags")
                    .insert(productTags);
                if (tagError) throw tagError;
            }
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success(variables.id ? "Product updated successfully!" : "Product added successfully!");
        },
        onError: (error) => {
            toast.error((error as any).message || "Failed to save product");
        }
    });

    return {
        products,
        isLoading,
        error,
        deleteProduct: deleteProductMutation.mutateAsync,
        toggleStatus: toggleStatusMutation.mutateAsync,
        saveProduct: saveProductMutation.mutateAsync,
        isSaving: saveProductMutation.isPending,
    };
};
