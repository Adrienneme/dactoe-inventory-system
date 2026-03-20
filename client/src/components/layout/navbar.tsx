import { LayoutDashboard, PackageSearch, ClipboardList, Map as MapIcon } from "lucide-react";
import { Link } from "@tanstack/react-router"

const NAV_ITEMS = [
  { label: "DASHBOARD", icon: LayoutDashboard, to: "/dashboard" },
  { label: "PRODUCTS", icon: PackageSearch, to: "/products" },
  { label: "REQUESTED", icon: ClipboardList, to: "/requested" },
  { label: "MAP", icon: MapIcon, to: "/map" },
];

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 flex h-16 w-full items-center justify-center bg-gray-800 px-4 text-white">
      <div className="flex items-center gap-8">
        {NAV_ITEMS.map(({ label, icon: Icon, to }) => (
          <Link
            key={to}
            to={to}
            activeProps={{ className: "text-blue-400" }}
            inactiveProps={{ className: "text-gray-200 hover:text-gray-400" }}
            className="flex flex-col items-center gap-1 transition-colors">
            <Icon size={20} />
            <span className="text-[10px] font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;