// routes/_authenticated.products.add.tsx
import { useState } from "react";
import { Info, Plus, LayoutGrid } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button";

import { InventoryMap } from "@/features/products/components/InventoryMap.tsx";
import { SizeCard } from "./components/sizeCard";
import Header from "@/components/layout/header";
import Navbar from "@/components/layout/navbar";

export default function AddProductPage() {
  const [categoryType, setCategoryType] = useState("adults");

  const ADULT_SIZES = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];
  const KID_SIZES = ["22", "23", "24", "25", "26", "27", "28", "29", "30"];

  return (
    <div className="min-h-screen w-full bg-[#FDF8F6] pt-20 pb-24">
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-10 space-y-6 mt-6">
        {/* Compact Title Section */}
        <div className="flex items-end justify-between px-2">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase italic">Add Product</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Inventory Management</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">

            {/* 1. Full Product Information Card */}
            <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
              <div className="px-8 py-4 bg-slate-50/50 border-b border-gray-100 flex items-center gap-3">
                <Info className="w-4 h-4 text-red-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Product Information</span>
              </div>

              <CardContent className="p-8 space-y-6">
                {/* First Row: Code & Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <Label htmlFor="code" className="text-[10px] font-bold text-gray-400 uppercase ml-1">Product Code</Label>
                    <Input id="code" placeholder="e.g. DSH-2024-01" className="h-11 rounded-xl bg-slate-50 border-none px-4 focus-visible:ring-1 focus-visible:ring-red-100" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-[10px] font-bold text-gray-400 uppercase ml-1">Product Name</Label>
                    <Input id="name" placeholder="e.g. Classic Runner Z1" className="h-11 rounded-xl bg-slate-50 border-none px-4 focus-visible:ring-1 focus-visible:ring-red-100" />
                  </div>
                </div>

                {/* Second Row: Brand & Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Brand</Label>
                    <Select>
                      <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-none px-4 text-gray-500">
                        <SelectValue placeholder="Select Brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nike">Nike</SelectItem>
                        <SelectItem value="adidas">Adidas</SelectItem>
                        <SelectItem value="new-balance">New Balance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="price" className="text-[10px] font-bold text-gray-400 uppercase ml-1">Price (₱)</Label>
                    <Input id="price" type="number" placeholder="0.00" className="h-11 rounded-xl bg-slate-50 border-none px-4 focus-visible:ring-1 focus-visible:ring-red-100" />
                  </div>
                </div>

                {/* Third Row: Category */}
                <div className="space-y-1.5 sm:max-w-[calc(50%-12px)]">
                  <Label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Category</Label>
                  <Select>
                    <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-none px-4 text-gray-500">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top-grade">Top Grade</SelectItem>
                      <SelectItem value="oem">OEM</SelectItem>
                      <SelectItem value="original">Original</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* 2. Stock Section with Category Switcher */}
            <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
              <div className="px-8 py-4 bg-slate-50/50 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <LayoutGrid className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Stock Assignment</span>
                </div>
                {/* Responsive Switcher */}
                <Select value={categoryType} onValueChange={setCategoryType}>
                  <SelectTrigger className="w-32 h-8 rounded-full text-[10px] font-black uppercase bg-white border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adults" className="text-[10px] font-bold">Adult Sizes</SelectItem>
                    <SelectItem value="kids" className="text-[10px] font-bold">Kids Sizes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardContent className="p-6 sm:p-8">
                {/* 3 columns on mobile, 5 on desktop */}
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                  {(categoryType === "adults" ? ADULT_SIZES : KID_SIZES).map((size) => (
                    <SizeCard
                      key={size}
                      size={`EU ${size}`}
                      isAssigned={size === "39" || size === "42"}
                      defaultQty={size === "39" ? 12 : size === "42" ? 8 : undefined}
                      defaultArea={size === "39" ? "Area 2" : size === "42" ? "Area 1" : undefined}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
              <CardContent className="p-6">
                <div className="h-36 rounded-2xl border-2 border-dashed border-gray-100 bg-slate-50/50 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-all">
                  <div className="p-2 bg-white rounded-full shadow-sm mb-2"><Plus className="w-4 h-4 text-gray-300" /></div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Upload Image</span>
                </div>
              </CardContent>
            </Card>

            <InventoryMap />

            <div className="flex flex-col gap-3 pt-2">
              <Button size="lg" className="h-14 bg-red-500 hover:bg-red-600 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-red-100">
                Save Product
              </Button>
              <Button variant="ghost" className="h-10 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Navbar />
    </div>
  );
}