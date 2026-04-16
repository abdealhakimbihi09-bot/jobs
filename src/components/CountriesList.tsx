import { useState, useEffect } from "react";
import CountryCard from "./CountryCard";
import { countries } from "../constants";
import { motion, AnimatePresence } from "motion/react";

export default function CountriesList() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="contents"
            >
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-full h-[220px] rounded-card bg-section animate-pulse relative overflow-hidden transition-colors duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  <div className="absolute bottom-6 left-6 space-y-2">
                    <div className="h-6 w-32 bg-surface rounded transition-colors duration-300" />
                    <div className="h-4 w-24 bg-surface rounded transition-colors duration-300" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="contents"
            >
              {countries.map((country, index) => (
                <CountryCard key={country.name} country={country} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
