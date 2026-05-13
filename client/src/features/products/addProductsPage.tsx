import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Info, Plus, LayoutGrid, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useAddProduct } from "./hooks/useProducts";

import { InventoryMap } from "@/features/products/components/InventoryMap.tsx";
import Header from "@/components/layout/header";
import Navbar from "@/components/layout/navbar";
import { Link } from "@tanstack/react-router";
import { LocationPicker } from "@/features/products/components/locationPicker.tsx";

const ADULT_SIZES = [
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
];
const KID_SIZES = [
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
];

type SizeType = "adults" | "kids";

type VariantDraft = {
  size_eu: number;
  stock_quantity: number;
  location: string;
};

// --- Main Page Component ---
export default function AddProductPage() {
  const [sizeType, setSizeType] = useState<SizeType>("adults");
  const { addProduct, isAdding } = useAddProduct();
  const variantCacheRef = useRef<
    Record<SizeType, Record<number, VariantDraft>>
  >({
    adults: {},
    kids: {},
  });

  const {
    register,
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
      name: "",
      brand_name: "",
      price: "" as any,
      category: "", // Added back
      variants: [] as {
        size_eu: number;
        stock_quantity: number;
        location: string;
      }[],
    },
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "variants",
  });

  const handleSizeTypeChange = (nextSizeType: SizeType) => {
    const currentVariants = getValues("variants") as VariantDraft[];
    variantCacheRef.current[sizeType] = currentVariants.reduce<
      Record<number, VariantDraft>
    >((acc, variant) => {
      acc[variant.size_eu] = variant;
      return acc;
    }, {});

    setSizeType(nextSizeType);
  };

  useEffect(() => {
    const sizes = sizeType === "adults" ? ADULT_SIZES : KID_SIZES;
    const cachedVariants = variantCacheRef.current[sizeType];
    replace(
      sizes.map((size) => {
        const sizeEu = parseInt(size);
        return (
          cachedVariants[sizeEu] ?? {
            size_eu: sizeEu,
            stock_quantity: 0,
            location: "F1:A1:L1",
          }
        );
      }),
    );
  }, [sizeType, replace]);

  const onSubmit = async (data: any) => {
    // Only send variants that actually have stock assigned
    const formattedData = {
      ...data,
      variants: data.variants.filter((v: any) => v.stock_quantity > 0),
    };

    if (formattedData.variants.length === 0) {
      alert("Please add stock to at least one size.");
      return;
    }

    await addProduct(formattedData);
  };

  return (
    <div className="min-h-screen w-full bg-[#FDF8F6] pt-20 pb-24">
      <Header />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[1400px] mx-auto px-4 sm:px-10 space-y-6 mt-6"
      >
        <div className="flex items-end justify-between px-2">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase italic">
              Add Product
            </h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Inventory Management
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Mobile Image Upload */}
          <div className="xl:hidden">
            <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
              <CardContent className="p-6">
                <div className="h-48 rounded-2xl border-2 border-dashed border-gray-100 bg-slate-50/50 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-all">
                  <div className="p-2 bg-white rounded-full shadow-sm mb-2">
                    <Plus className="w-4 h-4 text-gray-300" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">
                    Upload Image
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="xl:col-span-2 space-y-6">
            {/* 1. Product Information */}
            <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
              <div className="px-8 py-4 bg-slate-50/50 border-b border-gray-100 flex items-center gap-3">
                <Info className="w-4 h-4 text-red-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Product Information
                </span>
              </div>

              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="code"
                      className="text-[10px] font-bold text-gray-400 uppercase ml-1"
                    >
                      Product Code
                    </Label>
                    <Input
                      id="code"
                      {...register("code", { required: true })}
                      placeholder="e.g. DSH-2024-01"
                      className={cn(
                        "h-11 rounded-xl bg-slate-50 border-none px-4",
                        errors.code && "ring-2 ring-red-500",
                      )}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="name"
                      className="text-[10px] font-bold text-gray-400 uppercase ml-1"
                    >
                      Product Name
                    </Label>
                    <Input
                      id="name"
                      {...register("name", { required: true })}
                      placeholder="e.g. Classic Runner Z1"
                      className={cn(
                        "h-11 rounded-xl bg-slate-50 border-none px-4",
                        errors.name && "ring-2 ring-red-500",
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
                      Brand
                    </Label>
                    <Controller
                      name="brand_name"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            className={cn(
                              "h-11 rounded-xl bg-slate-50 border-none px-4 text-gray-500",
                              errors.brand_name && "ring-2 ring-red-500",
                            )}
                          >
                            <SelectValue placeholder="Select Brand" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nike">Nike</SelectItem>
                            <SelectItem value="adidas">Adidas</SelectItem>
                            <SelectItem value="new-balance">
                              New Balance
                            </SelectItem>
                            <SelectItem value="puma">Puma</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="price"
                      className="text-[10px] font-bold text-gray-400 uppercase ml-1"
                    >
                      Price (₱)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      {...register("price", {
                        required: true,
                        min: 0.01,
                        valueAsNumber: true,
                      })}
                      placeholder="0.00"
                      className={cn(
                        "h-11 rounded-xl bg-slate-50 border-none px-4",
                        errors.price && "ring-2 ring-red-500",
                      )}
                    />
                  </div>
                </div>

                {/* Category Row */}
                <div className="space-y-1.5 sm:max-w-[calc(50%-12px)]">
                  <Label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
                    Category
                  </Label>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className={cn(
                            "h-11 rounded-xl bg-slate-50 border-none px-4 text-gray-500",
                            errors.category && "ring-2 ring-red-500",
                          )}
                        >
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Top Grade">Top Grade</SelectItem>
                          <SelectItem value="OEM">OEM</SelectItem>
                          <SelectItem value="2-999">2-999</SelectItem>
                          <SelectItem value="2-1199">2-1199</SelectItem>
                          <SelectItem value="2-1499">2-1499</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 2. Stock Assignment */}
            <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
              <div className="px-8 py-4 bg-slate-50/50 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <LayoutGrid className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Stock Assignment
                  </span>
                </div>
                <Select value={sizeType} onValueChange={handleSizeTypeChange}>
                  <SelectTrigger className="w-32 h-8 rounded-full text-[10px] font-black uppercase bg-white border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="adults"
                      className="text-[10px] font-bold"
                    >
                      Adult Sizes
                    </SelectItem>
                    <SelectItem value="kids" className="text-[10px] font-bold">
                      Kids Sizes
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardContent className="p-6 sm:p-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="p-4 rounded-[28px] bg-slate-50/50 border border-slate-100 space-y-4"
                    >
                      <div className="flex justify-between items-center px-1">
                        <span className="text-xs font-black text-gray-900 uppercase">
                          EU {watch(`variants.${index}.size_eu`)}
                        </span>
                        <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-[9px] font-bold text-gray-400 uppercase ml-1">
                          Quantity
                        </Label>
                        <Input
                          type="number"
                          min={0}
                          {...register(
                            `variants.${index}.stock_quantity` as const,
                            { valueAsNumber: true },
                          )}
                          className="h-10 rounded-xl bg-white border-none shadow-sm focus-visible:ring-1 focus-visible:ring-red-100"
                          placeholder="0"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-[9px] font-bold text-gray-400 uppercase ml-1">
                          Location
                        </Label>
                        <Controller
                          name={`variants.${index}.location` as const}
                          control={control}
                          render={({ field }) => (
                            <LocationPicker
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="hidden xl:block border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
              <CardContent className="p-6">
                <div className="h-36 rounded-2xl border-2 border-dashed border-gray-100 bg-slate-50/50 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-all">
                  <div className="p-2 bg-white rounded-full shadow-sm mb-2">
                    <Plus className="w-4 h-4 text-gray-300" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">
                    Upload Image
                  </span>
                </div>
              </CardContent>
            </Card>

            <InventoryMap />

            <div className="flex flex-col gap-3 pt-2 w-full">
              <Button
                type="submit"
                disabled={isAdding}
                size="lg"
                className="h-14 bg-red-500 hover:bg-red-600 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-red-100 flex items-center justify-center gap-3"
              >
                {isAdding ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                {isAdding ? "Adding Product..." : "Save Product"}
              </Button>
              <Button
                asChild
                variant="ghost"
                className="w-full h-14 border-2 border-red-100 text-red-500 hover:bg-red-50 rounded-2xl font-black uppercase tracking-widest"
              >
                <Link to="/products">Cancel</Link>
              </Button>
            </div>
          </div>
        </div>
      </form>

      <Navbar />
    </div>
  );
}
