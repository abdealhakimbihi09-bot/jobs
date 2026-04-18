import { Search, ChevronDown, Menu, Sun, Moon, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "@/context/ThemeContext";
import { useSearch } from "@/context/SearchContext";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { searchQuery, setSearchQuery } = useSearch();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#121212] border-b border-gray-100 dark:border-white/10 shadow-sm min-h-14 ring-1 ring-black/5 flex items-center transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex justify-between items-center py-2 gap-4">
          {/* Left: Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-blue-500/20">
              <span className="text-white font-black text-xl">J</span>
            </div>
            <span className="hidden sm:block text-lg font-black tracking-tighter dark:text-white">JOBLINK</span>
          </Link>

          {/* Center: Persistent Search Bar */}
          <div className="flex-grow max-w-xl hidden md:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4.5 w-4.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs, categories, or keywords..."
                className="block w-full pl-11 pr-10 py-2.5 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-blue-500/50 dark:focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 rounded-2xl text-[14px] font-medium text-text-main placeholder-gray-400 transition-all outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Search Icon (only if we want to show it on mobile) */}
            <button className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors">
              <Search className="w-5 h-5 stroke-[2]" />
            </button>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-blue-600 hover:bg-highlight-bg dark:hover:bg-white/5 rounded-xl transition-all relative overflow-hidden group"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'light' ? (
                  <motion.div
                    key="moon"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5 stroke-[2]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5 stroke-[2]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Right Side Controls */}
            <div className="flex items-center gap-2">
              <button className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white font-extrabold rounded-full text-[13px] shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 leading-none">
                Get Started
                <ChevronDown className="w-3.5 h-3.5 stroke-[3]" />
              </button>

              <button className="p-2.5 text-gray-900 dark:text-white transition-colors hover:text-blue-600 hover:bg-highlight-bg dark:hover:bg-white/5 rounded-xl">
                <Menu className="w-6 h-6 stroke-[2]" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Input (Visible only on mobile) */}
        <div className="md:hidden pb-3">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs..."
              className="block w-full pl-9 pr-10 py-2 bg-gray-50 dark:bg-white/5 border border-transparent rounded-xl text-[14px] font-medium text-text-main placeholder-gray-400 transition-all outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
