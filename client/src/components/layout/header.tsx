import { useState } from "react" // 1. Added useState
import { Link, useNavigate } from "@tanstack/react-router"
import { User, SquareActivity, LogOut, ChevronDown } from "lucide-react"
import logo from "@/assets/logo.png"
import { useUserStore } from "@/store/useUserStore"
import supabase from "@/lib/supabase" 

const Header = () => {
  const navigate = useNavigate()
  const { username, email, clearAuth } = useUserStore()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
  try {
    await supabase.auth.signOut()
    clearAuth()
    setIsOpen(false)
    navigate({ to: "/login" })
  } catch (error) {
    console.error("Error during logout:", error)
    clearAuth()
    navigate({ to: "/login" })
  }
}

  return (
    <header className="fixed top-0 z-50 flex h-20 w-full items-center justify-between border-b border-gray-700 bg-gray-900 px-6 text-white">

      <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg">
          <img src={logo} alt="Logo" className="object-contain" />
        </div>
        <span className="text-md font-bold tracking-tight">DACTOE INVENTORY</span>
      </Link>

      <div className="flex items-center gap-4 sm:gap-6">
        <Link to="/logs" className="relative rounded-full p-2 hover:bg-gray-800 transition-colors">
          <SquareActivity size={20} className="text-gray-400" />
          <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500"></span>
        </Link>

        <div className="h-8 w-px bg-gray-700"></div>

        <div className="relative">
          <button type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 rounded-md p-1 hover:bg-gray-800 transition-all"
          >
            {/* Username - Hidden on small screens */}
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium leading-none">{username}</p>
              <p className="text-xs truncate">{email}</p>
              <p className="text-[10px] uppercase tracking-wider text-blue-400 mt-1">Employee</p>
            </div>

            {/* Icon remains visible always */}
            <div className="bg-gray-800 p-2 rounded-full border border-gray-700">
              <User size={18} />
            </div>
            <ChevronDown size={14} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* THE POP-UP MENU */}
          {isOpen && (
            <>
              {/* Invisible backdrop to close menu when clicking outside */}
              <div className="fixed inset-0 z-[-1]" onClick={() => setIsOpen(false)} />

              <div className="absolute right-0 mt-2 w-48 rounded-md border border-gray-700 bg-gray-800 p-2 shadow-xl">
                {/* Mobile-Only Info (Visible only when username is hidden in header) */}
                <div className="px-3 py-2 sm:hidden border-b border-gray-700 mb-2">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="text-sm font-bold truncate">{username}</p>
                  <p className="text-xs truncate">{email}</p>
                </div>

                <button type="button"
                  onClick={() => {handleLogout()}}
                  className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm text-red-400 hover:bg-red-900/20 transition-colors"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header