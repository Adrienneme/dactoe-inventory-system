import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@/lib/supabase";
import { useNavigate } from "@tanstack/react-router";

export const useProductMutations = (productId: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateMutation = useMutation({
    mutationFn: async (updatedData: any) => {
      const { data, error } = await supabase
        .from("products")
        .update(updatedData)
        .eq("id", productId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("products").delete().eq("id", productId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate({ to: "/products" });
    },
  });

  return {
    updateProduct: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deleteProduct: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};