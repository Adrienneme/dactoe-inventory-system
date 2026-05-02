// src/pages/Dashboard.tsx
import Header from "@/components/layout/header"
import Navbar from "@/components/layout/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts"
import { TrendingUp } from "lucide-react"

// Import the mock data
import { MOCK_DASHBOARD_DATA } from "@/features/dashboard/data/dashboard-data"

export const dashboardPage = () => {

  const data = MOCK_DASHBOARD_DATA;

  return (
    <div className="min-h-screen w-full bg-[#FDF8F6] pt-20 pb-24">
      <Header />
      
      <main className="w-full px-4 sm:px-10 max-w-350 mx-auto space-y-8 mt-10">
        {/* Header Section */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm font-medium">Real-time sales and inventory insights</p>
        </div>

        {/* Top Grid: Chart & Alerts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-2 border-none shadow-sm rounded-3xl bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
              <div className="flex gap-10">
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Total Revenue</p>
                  <h2 className="text-3xl font-extrabold">${data.revenue.toLocaleString()}</h2>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Units Sold</p>
                  <h2 className="text-3xl font-extrabold">{data.unitsSold.toLocaleString()}</h2>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-600 border-none px-3 py-1.5 font-bold rounded-full">
                <TrendingUp size={14} className="mr-1" /> {data.growth}%
              </Badge>
            </CardHeader>
            <CardContent className="h-75">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.chartData}>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} 
                  />
                  <Line type="monotone" dataKey="val" stroke="#F06529" strokeWidth={4} dot={false} />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex justify-between px-2 text-[10px] font-bold text-gray-500 tracking-tighter">
                {data.chartData.map(d => <span key={d.name}>{d.name}</span>)}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl bg-white">
            <CardHeader><CardTitle className="text-xl font-bold">Low Stock Alerts</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {data.lowStock.map((item) => (
                <div key={item.id} className={`p-4 rounded-2xl flex items-center gap-4 ${item.type === 'critical' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`}>
                  <div className="h-12 w-12 bg-gray-900 rounded-xl shrink-0 shadow-inner" />
                  <div>
                    <p className="text-sm font-bold text-gray-900 leading-none mb-1">{item.name}</p>
                    <p className="text-xs font-bold opacity-80">{item.status}</p>
                  </div>
                </div>
              ))}
              <button type="button" className="w-full pt-4 text-[#F06529] font-extrabold text-sm hover:translate-x-1 transition-transform text-center">
                View Inventory →
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Grid: Activity & Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-none shadow-sm rounded-3xl bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
              <Badge variant="outline" className="text-orange-500 border-orange-200 font-bold px-3">LIVE</Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.activities.map((act) => (
                <div key={act.id} className="flex gap-4 items-center">
                  <div className={`h-11 w-11 shrink-0 rounded-full flex items-center justify-center ${act.color}`}>
                    <act.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">{act.title}</p>
                    <p className="text-xs text-gray-400 font-medium">{act.detail}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
            <CardHeader><CardTitle className="text-xl font-bold">Top Selling Shoes</CardTitle></CardHeader>
            <Table>
              <TableHeader>
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="text-[10px] font-bold uppercase pl-5">Product</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase text-center">Sold</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase text-right pr-8">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.topProducts.map((shoe) => (
                  <TableRow key={shoe.name} className="border-none hover:bg-gray-50/50">
                    <TableCell className="font-bold flex items-center gap-3 pl-5">
                      <div className="h-10 w-10 bg-gray-100 rounded-lg shrink-0" /> {shoe.name}
                    </TableCell>
                    <TableCell className="text-center font-bold text-gray-400">{shoe.sold}</TableCell>
                    <TableCell className="text-right font-bold text-[#F06529] pr-8">${shoe.revenue.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>

      <Navbar />
    </div>
  )
}