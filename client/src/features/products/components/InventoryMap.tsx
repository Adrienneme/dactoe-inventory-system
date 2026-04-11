// components/inventory/InventoryMapPlaceholder.tsx
import { MapPin, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const InventoryMap = () => (
  <Card className="border-none shadow-none rounded-[28px] bg-white">
    <CardHeader className="flex flex-row items-center justify-between gap-3 p-8 pb-3">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 bg-red-100/50 rounded-xl flex items-center justify-center">
          <MapPin className="w-5 h-5 text-red-500" />
        </div>
        <CardTitle className="text-lg font-bold">Inventory Map</CardTitle>
      </div>
      <Badge className="bg-white text-red-500 border border-red-100 px-3 py-1 font-bold text-[10px] rounded-full">
        LIVE PREVIEW
      </Badge>
    </CardHeader>
    <CardContent className="p-8 space-y-4">
      
      {/* Visual Placeholder Section (mimicking the coming map) */}
      <div className="h-40 rounded-2xl border-2 border-dashed border-gray-200 bg-slate-50 flex items-center justify-center text-center">
          <div className="text-center space-y-1.5">
            <Zap className="w-10 h-10 text-orange-200 mx-auto" strokeWidth={1} />
            <p className="text-base font-bold text-gray-600">Coming Soon</p>
            <p className="text-xs text-gray-400 font-medium px-6">We are building an interactive map visualIZER for your warehouse locations.</p>
          </div>
      </div>
    </CardContent>
  </Card>
);