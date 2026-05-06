import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import supabase from "@/lib/supabase";

// --- Types & Interfaces ---
export interface Product {
  id: string;
  code: string;
  name: string;
  brand_name: string;
  price: number;
  category: string;
  image_url: string | null;
  created_at: string;
  product_variants?: ProductVariant[];
}

export interface ProductVariant {
  id?: string;
  product_id?: string;
  size_eu: number;
  stock_quantity: number;
  location: string;
}

interface ProductWithVariant extends Omit<
  Product,
  "id" | "created_at" | "product_variants"
> {
  variants: ProductVariant[];
}

// --- Hooks ---

/**
 * Hook to fetch all products
 */
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);
      return data as Product[];
    },
  });
}

/**
 * Hook to fetch a single product with its variants
 */
export function useProduct(productId: string | undefined) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      if (!productId) throw new Error("Product ID is required");

      const { data, error } = await supabase
        .from("products")
        .select(
          `
          *,
          product_variants (
            id,
            size_eu,
            stock_quantity,
            location
          )
        `,
        )
        .eq("id", productId)
        .single();

      if (error) throw error;
      if (!data) throw new Error("Product not found");
      return data as Product;
    },
    enabled: !!productId,
  });
}

/**
 * Hook to add a new product and its variants
 */
export function useAddProduct() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: addProduct, isPending: isAdding } = useMutation({
    mutationFn: async (payload: ProductWithVariant) => {
      const { variants, ...productData } = payload;

      const activeVariants = variants.filter((v) => v.stock_quantity > 0);
      if (activeVariants.length === 0) {
        throw new Error(
          "At least one size must have a stock quantity greater than 0.",
        );
      }

      const { data: product, error: productError } = await supabase
        .from("products")
        .insert([productData])
        .select()
        .single();

      if (productError) throw new Error(productError.message);

      const variantsWithId = activeVariants.map((v) => ({
        ...v,
        product_id: product.id,
      }));

      const { error: variantError } = await supabase
        .from("product_variants")
        .insert(variantsWithId);

      if (variantError) {
        await supabase.from("products").delete().eq("id", product.id);
        throw new Error(variantError.message);
      }

      return product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product_variants"] });
      navigate({ to: "/products" });
    },
  });

  return { addProduct, isAdding };
}

/**
 * Hook to update or delete a product and its variants
 */
export function useProductMutations(productId: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateMutation = useMutation({
    mutationFn: async ({
      productData,
      variantData,
    }: {
      productData: Partial<Product>;
      variantData: ProductVariant[];
    }) => {
      const { error: productError } = await supabase
        .from("products")
        .update(productData)
        .eq("id", productId);

      if (productError) throw productError;

      const { error: deleteError } = await supabase
        .from("product_variants")
        .delete()
        .eq("product_id", productId);

      if (deleteError) throw deleteError;

      const activeVariants = variantData
        .filter((v) => v.stock_quantity > 0)
        .map((v) => ({
          product_id: productId,
          size_eu: v.size_eu,
          stock_quantity: v.stock_quantity,
          location: v.location,
        }));

      if (activeVariants.length > 0) {
        const { error: variantError } = await supabase
          .from("product_variants")
          .insert(activeVariants);

        if (variantError) throw variantError;
      }

      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);
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
}
