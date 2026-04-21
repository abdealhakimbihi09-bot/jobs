import React, { useState } from "react";
import { ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SubcategoryCardProps {
  title: string;
  index: number;
  onClick?: () => void;
  key?: string;
}

export default function SubcategoryCard({ title, index, onClick }: SubcategoryCardProps) {
  const [isShortlisted, setIsShortlisted] = useState(false);

  const toggleShortlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsShortlisted(!isShortlisted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: [0.23, 1, 0.32, 1] 
      }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className="relative group"
    >
      <div 
        onClick={onClick}
        className="w-full bg-white border border-gray-100 rounded-[22px] px-6 py-5 flex items-center justify-between cursor-pointer transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] active:scale-[0.98] group-hover:bg-blue-50/30"
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Status Dot */}
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform" />
          
          <div className="flex flex-col min-w-0">
            <span className="text-gray-900 font-bold text-[15px] sm:text-[16px] truncate group-hover:text-blue-600 transition-colors">
              {title}
            </span>
            <span className="text-[11px] text-gray-500 mt-0.5 font-medium uppercase tracking-wider opacity-60">
              Verified Opening
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Shortlist Button */}
          <motion.button
            onClick={toggleShortlist}
            whileTap={{ scale: 0.8 }}
            className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center ${
              isShortlisted 
                ? "bg-yellow-50 border-yellow-200 text-yellow-500" 
                : "bg-gray-50 border-gray-100 text-gray-400 hover:border-blue-200"
            }`}
          >
            <AnimatePresence mode="wait">
              {isShortlisted ? (
                <motion.div
                  key="star-filled"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 45 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Star className="w-4 h-4 fill-current" />
                </motion.div>
              ) : (
                <motion.div
                  key="star-outline"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Star className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Hover Highlight Ring */}
        <div className="absolute inset-0 rounded-[22px] border-2 border-blue-500/0 group-hover:border-blue-500/10 pointer-events-none transition-all duration-300" />
      </div>

      {/* Quick Tooltip on Shortlist */}
      <AnimatePresence>
        {isShortlisted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute -top-8 right-0 bg-yellow-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg pointer-events-none z-10"
          >
            SHORTLISTED
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
