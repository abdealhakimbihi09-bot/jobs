import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Check, Search } from "lucide-react";

interface Option {
  label: string;
  value: string;
  icon?: string;
  code?: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label?: string;
  error?: string;
  searchable?: boolean;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder,
  label,
  error,
  searchable = false
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  return (
    <div className="space-y-1.5 relative w-full" ref={containerRef}>
      {label && (
        <label className="text-[13px] font-bold text-gray-700 dark:text-gray-300 ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setSearchQuery("");
          }}
          className={`w-full px-5 py-3 bg-gray-50 dark:bg-white/5 border ${
            error ? "border-red-500" : "border-transparent"
          } focus:border-blue-500 hover:border-blue-500/50 rounded-2xl outline-none text-sm dark:text-white transition-all flex items-center justify-between text-left group shadow-sm`}
        >
          <span className={selectedOption ? "text-gray-900 dark:text-white font-medium" : "text-gray-400 font-medium"}>
            {selectedOption ? (
              <div className="flex items-center gap-2">
                {selectedOption.icon && <span className="text-lg leading-none">{selectedOption.icon}</span>}
                {selectedOption.label}
              </div>
            ) : (
              placeholder
            )}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl z-[100] overflow-hidden"
            >
              {searchable && (
                <div className="p-3 border-b border-gray-100 dark:border-white/5">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-blue-500 rounded-xl outline-none text-sm dark:text-white"
                    />
                  </div>
                </div>
              )}
              <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        onChange(opt.value);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-blue-600/10 dark:hover:bg-blue-600/20 rounded-xl transition-all text-left text-sm group"
                    >
                      <div className="flex items-center gap-3">
                        {opt.icon && <span className="text-xl leading-none">{opt.icon}</span>}
                        <span
                          className={`font-medium transition-colors ${
                            value === opt.value
                              ? "text-blue-600"
                              : "text-gray-700 dark:text-gray-300 group-hover:text-blue-600"
                          }`}
                        >
                          {opt.label}
                        </span>
                      </div>
                      {value === opt.value && <Check className="w-4 h-4 text-blue-600" />}
                    </button>
                  ))
                ) : (
                  <div className="py-8 text-center text-gray-500 text-sm italic">
                    No results found.
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
