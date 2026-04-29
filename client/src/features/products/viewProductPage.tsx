import { Info, LayoutGrid, Edit2, Trash2, ArrowLeft, Loader2, Save, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { InventoryMap } from "@/features/products/components/InventoryMap.tsx";
import { SizeCard } from "./components/sizeCard";
import Header from "@/components/layout/header";
import Navbar from "@/components/layout/navbar";
import { useProduct } from "./hooks/useProduct";
import { useProductMutations } from "./hooks/useProductMutations";

import { Link, useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ViewProductPage() {
  const { productId } = useParams({ from: '/_authenticated/products/$productId' });
  const { data: product, isLoading, error } = useProduct(productId);
  const { updateProduct, deleteProduct, isUpdating, isDeleting } = useProductMutations(productId!);

  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    console.log(isEditing)
    if (product) {
      reset(product);
    }
  }, [product, isEditing, reset]);

  const onSave = async (data: any) => {
    const { id, created_at, ...updateData } = data;
    await updateProduct(updateData);
    setIsEditing(false);
  };

  const ADULT_SIZES = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];
  const KID_SIZES = ["22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35"];

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#FDF8F6] pt-20">
        <Header />
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-xs font-black uppercase tracking-widest italic">Retrieving Product Details...</p>
        </div>
        <Navbar />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen w-full bg-[#FDF8F6] pt-20 flex flex-col items-center justify-center">
        <Header />
        <p className="text-red-500 font-bold uppercase tracking-tighter italic">Product not found</p>
        <Navbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FDF8F6] pt-20 pb-24">
      <Header />

      <form onSubmit={handleSubmit(onSave)} className="max-w-[1400px] mx-auto px-4 sm:px-10 space-y-6 mt-6">
        <div className="flex items-end justify-between px-2">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase italic">Product Details</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Inventory Management • {product.code}</p>
          </div>
          <Link to="/products">
            <Button variant="ghost" size="sm" className="text-gray-400 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
              <ArrowLeft className="w-3 h-3" /> Back to Products
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            {/* 1. Product Information Card */}
            <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
              <div className="px-8 py-4 bg-slate-50/50 border-b border-gray-100 flex items-center gap-3">
                <Info className="w-4 h-4 text-red-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Product Information</span>
              </div>

              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Product Code</Label>
                    <Input
                      disabled={!isEditing}
                      {...register("code")}
                      className="h-11 rounded-xl bg-slate-50 border-none px-4 focus-visible:ring-0 disabled:opacity-70"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Product Name</Label>
                    <Input
                      disabled={!isEditing}
                      {...register("name")}
                      className="h-11 rounded-xl bg-slate-50 border-none px-4 focus-visible:ring-0 disabled:opacity-70"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Brand</Label>
                    <Input
                      disabled={!isEditing}
                      {...register("brand_name")}
                      className="h-11 rounded-xl bg-slate-50 border-none px-4 focus-visible:ring-0 disabled:opacity-70"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Price (₱)</Label>
                    <Input
                      disabled={!isEditing}
                      {...register("price")}
                      className="h-11 rounded-xl bg-slate-50 border-none px-4 focus-visible:ring-0 disabled:opacity-70 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 sm:max-w-[calc(50%-12px)]">
                  <Label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Category</Label>
                  <div className="h-11 flex items-center px-4 rounded-xl bg-slate-50">
                    <Badge variant="secondary" className="bg-red-50 text-red-600 border-none text-[10px] font-bold uppercase tracking-wider">
                      {product.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Stock Section */}
            <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
              <div className="px-8 py-4 bg-slate-50/50 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <LayoutGrid className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Current Stock Level</span>
                </div>
                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-gray-200">
                  {product.categoryType === "adults" ? "Adult Sizes" : "Kids Sizes"}
                </Badge>
              </div>
              <CardContent className="p-6 sm:p-8">
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                  {(product.categoryType === "adults" ? ADULT_SIZES : KID_SIZES).map((size) => (
                    <SizeCard key={size} size={`EU ${size}`} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
              <CardContent className="p-6">
                <div className="aspect-square rounded-2xl bg-slate-50 flex items-center justify-center border border-gray-100 overflow-hidden">
                  {product.image_url ? <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" /> : <span className="text-[10px] font-bold text-gray-300 uppercase italic">No Product Image</span>}
                </div>
              </CardContent>
            </Card>

            <InventoryMap />

            <div className="flex flex-col gap-3 pt-2">
              {isEditing ? (
                <>
                  <Button
                    type="submit"
                    onClick={() => console.log("INSIDE")}
                    disabled={isUpdating}
                    size="lg"
                    className="h-14 bg-red-500 hover:bg-red-600 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-red-100 flex items-center justify-center gap-3"
                  >
                    {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Product
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      reset(product);
                      setIsEditing(false);
                    }}
                    disabled={isUpdating}
                    variant="outline"
                    className="h-14 border-2 border-red-100 text-red-500 hover:bg-red-50 rounded-2xl font-black uppercase tracking-widest"
                  >
                    <X className="w-4 h-4 mr-2 inline" /> Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();                    
                      setIsEditing(true);
                      console.log(`CLICKED!${isEditing}`);
                    }}
                    disabled={isDeleting}
                    size="lg"
                    className="h-14 bg-red-500 hover:bg-red-600 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-red-100 flex items-center justify-center gap-3"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Product
                  </Button>
                  <Button
                    type="button"
                    onClick={() => window.confirm("Are you sure you want to delete this product?") && deleteProduct()}
                    disabled={isDeleting}
                    variant="outline"
                    className="h-14 border-2 border-red-100 text-red-500 hover:bg-red-50 rounded-2xl font-black uppercase tracking-widest"
                  >
                    {isDeleting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Trash2 className="w-4 h-4 mr-2 inline" />}
                    Delete Product
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
      <Navbar />
    </div>
  );
}