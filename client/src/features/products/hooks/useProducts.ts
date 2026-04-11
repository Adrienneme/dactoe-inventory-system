import { useQuery } from "@tanstack/react-query";
import  supabase  from "@/lib/supabase";

export interface Product {
  id: string;
  code: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  image_url: string | null;
  created_at: string;
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data as Product[];
    },
  });
}