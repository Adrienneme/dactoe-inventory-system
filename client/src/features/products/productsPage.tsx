import { Search, ClipboardList, AlertTriangle, TrendingUp, Plus, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import StatCard from "./components/statCards";
import { useProducts } from "./hooks/useProducts";

import Header from "@/components/layout/header";
import Navbar from "@/components/layout/navbar";

export const productsPage = () => {

    const { data: products, isLoading, error } = useProducts();

    return (
        <div className="min-h-screen w-full bg-[#FDF8F6] pt-20 pb-24">
            <Header />
            <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-800">Products Inventory</h1>
                        <Link to="/products/add">
                            <Button className="bg-red-500 hover:bg-red-600 text-white font-bold h-9 px-4 rounded-xl flex items-center gap-2 shadow-sm transition-all active:scale-95">
                                <Plus size={18} />
                                <span className="hidden sm:inline">Add Product</span>
                            </Button>
                        </Link>
                    </div>
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Search products, codes, or categories..." className="pl-10 bg-white border-gray-200" />
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 sm:gap-6">
                    <StatCard label="Total Products" value={products ? products.length.toLocaleString() : "0"} Icon={ClipboardList} bgClass="bg-blue-50" iconClass="text-blue-500" />
                    <StatCard label="Low Stock" value="12" Icon={AlertTriangle} bgClass="bg-red-50" iconClass="text-red-500" />
                    <StatCard label="Top Sellers" value="84" Icon={TrendingUp} bgClass="bg-emerald-50" iconClass="text-emerald-500" />
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {isLoading ? (
                        <div className="py-24 flex flex-col items-center justify-center gap-4 text-slate-400">
                            <Loader2 className="w-8 h-8 animate-spin" />
                            <p className="text-xs font-black uppercase tracking-widest italic">Syncing with Inventory...</p>
                        </div>
                    ) : error ? (
                        <div className="py-24 flex flex-col items-center justify-center gap-2 text-red-500">
                            <p className="font-black uppercase tracking-tighter italic text-sm">Failed to connect to Database</p>
                            <p className="text-[10px] font-bold uppercase tracking-wide">{(error as Error).message}</p>
                        </div>
                    ) : (
                    <div className="overflow-auto max-h-[500px]">
                        <Table className="min-w-[500px] sm:min-w-full">
                            <TableHeader className="bg-slate-50/50 sticky top-0 z-10 shadow-sm">
                                <TableRow className="hover:bg-transparent uppercase text-[11px] font-bold tracking-wider">
                                    <TableHead className="w-16 sm:w-24 px-2 sm:px-4">Img</TableHead>
                                    <TableHead className="px-2 sm:px-4">Product</TableHead>
                                    <TableHead className="px-2 sm:px-4 hidden xs:table-cell">Code</TableHead>
                                    <TableHead className="px-2 sm:px-4">Category</TableHead>
                                    <TableHead className="text-right px-2 sm:px-4">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products?.map((product) => (
                                    <TableRow key={product.id} className="group transition-colors">
                                        <TableCell className="px-2 sm:px-4">
                                            <img src={product.image_url || " "} className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-slate-100 object-cover border" alt=" " />
                                        </TableCell>
                                        <TableCell className="px-2 sm:px-4">
                                            <div className="font-semibold text-slate-900 text-xs sm:text-sm leading-tight whitespace-normal">{product.name}</div>
                                        </TableCell>
                                        <TableCell className="font-mono text-[10px] sm:text-sm text-slate-600 px-2 sm:px-4 hidden xs:table-cell">{product.code}</TableCell>
                                        <TableCell className="px-2 sm:px-4">
                                            <Badge variant="secondary" className={`text-[9px] sm:text-xs px-1.5 sm:px-3 whitespace-nowrap ${
                                                product.category === 'Top Grade' ? "bg-red-50 text-red-600 border-none" :
                                                    product.category === '2-999' ? "bg-blue-50 text-blue-600 border-none" :
                                                        "bg-orange-50 text-orange-600 border-none"
                                            }`}>
                                                {product.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right px-2 sm:px-4">
                                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 font-bold h-8 px-2 sm:px-4">View</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    )}
                </div>
            </div>

            <Navbar />
        </div>

    );
}