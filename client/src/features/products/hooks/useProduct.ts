import { useQuery } from "@tanstack/react-query";
import  supabase  from "@/lib/supabase";

export const useProduct = (productId: string | undefined) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      if (!productId) throw new Error("Product ID is required");

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) throw error;
      if (!data) throw new Error("Product not found");
      return data;
    },
    enabled: !!productId,
  });
};