// src/data/dashboard-data.ts
import { ShoppingCart, Box, UserPlus, type LucideIcon } from "lucide-react"

export interface Activity {
  id: number;
  type: string;
  title: string;
  detail: string;
  icon: LucideIcon;
  color: string;
}

export interface DashboardData {
  revenue: number;
  unitsSold: number;
  growth: number;
  chartData: { name: string; val: number }[];
  lowStock: { id: number; name: string; status: string; type: 'critical' | 'warning' }[];
  activities: Activity[];
  topProducts: { name: string; sold: number; revenue: number }[];
}

export const MOCK_DASHBOARD_DATA: DashboardData = {
  revenue: 42500.00,
  unitsSold: 1284,
  growth: 12.5,
  chartData: [
    { name: "MON", val: 400 }, { name: "TUE", val: 300 }, { name: "WED", val: 500 },
    { name: "THU", val: 280 }, { name: "FRI", val: 590 }, { name: "SAT", val: 320 }, 
    { name: "SUN", val: 480 }, 
  ],
  lowStock: [
    { id: 1, name: "Air Jordan 1 Retro", status: "Only 2 left in stock", type: "critical" },
    { id: 2, name: "Ultraboost Light", status: "5 items remaining", type: "warning" }
  ],
  activities: [
    { id: 101, type: "order", title: "New Order #8821", detail: "2 mins ago • $180.00", icon: ShoppingCart, color: "text-orange-500 bg-orange-50" },
    { id: 102, type: "stock", title: "Stock Restocked", detail: "45 mins ago • Nike Dunk Low (50 units)", icon: Box, color: "text-blue-500 bg-blue-50" },
    { id: 103, type: "user", title: "New Wholesale Account", detail: "3 hours ago • Urban Footwear Co.", icon: UserPlus, color: "text-purple-500 bg-purple-50" }
  ],
  topProducts: [
    { name: "Nike Air Max", sold: 124, revenue: 18600 },
    { name: "Yeezy Boost 350", sold: 98, revenue: 21560 },
    { name: "New Balance 550", sold: 82, revenue: 10250 }
  ]
};