import { type LucideIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface StatProps {
  label: string;
  value: string | number;
  Icon: LucideIcon;
  iconClass: string;
  bgClass: string;
}

const StatCard = ({ label, value, Icon, iconClass, bgClass }: StatProps) => (
  <Card className="flex-1 shadow-none border-gray-100 bg-gray-50">
    <CardContent className="p-3 sm:p-6 flex items-center gap-2 sm:gap-4">
      <div className={`p-2 sm:p-3 rounded-lg ${bgClass}`}>
        <Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${iconClass}`} />
      </div>
      <div>
        <p className="text-[10px] sm:text-sm font-medium text-muted-foreground leading-tight">{label}</p>
        <p className="text-[20px] sm:text-[40px] font-bold">{value}</p>
      </div>
    </CardContent>
  </Card>
);

export default StatCard;