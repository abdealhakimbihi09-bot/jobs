import { Search, ChevronDown, Menu } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm h-14 ring-1 ring-black/5">
      <div className="max-w-md mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Left: Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center transition-transform hover:scale-105">
              <span className="text-white font-bold text-base">J</span>
            </div>
          </Link>

          {/* Center-Left: Search */}
          <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
            <Search className="w-5 h-5 stroke-[2]" />
          </button>
          
          {/* Center-Right: Get Started */}
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 text-white font-extrabold rounded-full text-[12px] shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 leading-none">
            Get Started
            <ChevronDown className="w-3 h-3 stroke-[3]" />
          </button>

          {/* Right: Menu */}
          <button className="p-2 text-gray-900 transition-colors hover:text-blue-600">
            <Menu className="w-6 h-6 stroke-[2]" />
          </button>
        </div>
      </div>
    </header>
  );
}
