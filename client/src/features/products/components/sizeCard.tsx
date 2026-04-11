import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const SizeCard = ({ size, defaultQty, defaultArea, isAssigned }: { size: string; defaultQty?: number; defaultArea?: string; isAssigned?: boolean }) => (
  <div className={`p-3 border rounded-2xl transition-all ${isAssigned ? 'bg-red-50 border-red-100 shadow-sm' : 'bg-white border-gray-100'}`}>
    <div className="flex items-center justify-between mb-2">
      <Label className={`text-[10px] font-extrabold uppercase tracking-tight ${isAssigned ? 'text-red-500' : 'text-gray-400'}`}>
        {size}
      </Label>
      {isAssigned && <Badge className="bg-white text-red-500 border-none px-2 py-0.5 font-bold text-[9px] rounded-full shadow-sm">Live</Badge>}
    </div>
    <div className="space-y-1.5">
      <Input 
        placeholder="Qty" 
        defaultValue={defaultQty} 
        className="h-8 text-center text-xs font-bold text-slate-800 rounded-lg bg-white border-gray-100 focus:ring-1 focus:ring-red-100" 
      />
      <div className="flex items-center justify-between px-2 h-8 border border-gray-100 rounded-lg bg-white text-[10px] font-bold text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors">
        <span>{defaultArea || 'Area'}</span>
        <ChevronDown className="w-3 h-3 text-gray-400" />
      </div>
    </div>
  </div>
);