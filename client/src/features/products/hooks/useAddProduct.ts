import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import  supabase  from "@/lib/supabase";

interface ProductData {
  code: string;
  name: string;
  brand_name: string;
  price: number;
  category: string;
  // Add other fields if necessary, e.g., image_url, stock details
}

export function useAddProduct() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: addProduct, isPending: isAdding } = useMutation({
    mutationFn: async (productData: ProductData) => {
      const { data, error } = await supabase
        .from("products") 
        .insert([productData])
        .select(); 

      if (error) {
        console.error("Error adding product:", error);
        throw new Error(error.message);
      }
      console.log("Product saved to database:", data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate({ to: "/products" });
    },
    onError: (error) => {
      console.error("Failed to add product:", error.message);
      // Optionally, show a toast notification or other user feedback
    },
  });

  return { addProduct, isAdding };
}