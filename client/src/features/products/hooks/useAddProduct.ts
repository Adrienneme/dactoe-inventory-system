import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import supabase from "@/lib/supabase";

interface ProductData {
  code: string;
  name: string;
  brand_name: string;
  price: number;
  category: string;
}

interface VariantData {
  size_eu: number;
  stock_quantity: number;
  location: string;
}

interface ProductWithVariant extends ProductData {
  variants: VariantData[];
}

export function useAddProduct() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: addProduct, isPending: isAdding } = useMutation({
    mutationFn: async (payload: ProductWithVariant) => {
      const { variants, ...productData } = payload;

      // 1. Filter out variants with 0 stock before doing anything
      const activeVariants = variants.filter(v => v.stock_quantity > 0);

      // If no variants have stock, you might want to stop here 
      // or allow creating a product with 0 stock (depending on your business logic)
      if (activeVariants.length === 0) {
        throw new Error("At least one size must have a stock quantity greater than 0.");
      }

      // 2. Insert the Product
      const { data: product, error: productError } = await supabase
        .from("products")
        .insert([productData])
        .select()
        .single();

      if (productError) throw new Error(productError.message);

      // 3. Prepare variants with the new product_id
      const variantsWithId = activeVariants.map((v) => ({
        ...v,
        product_id: product.id,
      }));

      // 4. Insert Variants
      const { error: variantError } = await supabase
        .from("product_variants")
        .insert(variantsWithId);

      if (variantError) {
        // Clean up: Delete the product if variants failed so we don't have a "ghost" product
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