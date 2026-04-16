import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Country } from "../types";

interface CountryCardProps {
  country: Country;
  index: number;
  key?: string;
}

export default function CountryCard({ country, index }: CountryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/jobs/${country.name.toLowerCase()}`}
        className="group relative block w-full h-[220px] rounded-card overflow-hidden shadow-theme border border-border-theme bg-surface hover:shadow-theme-hover hover:scale-[1.02] transition-all duration-300"
      >
        {/* Background Image */}
        <img
          src={country.image}
          alt={`Jobs in ${country.name}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Gradient Overlay for Readability */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-300 pointer-events-none"
        />

        {/* Content - Bottom Anchored */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pt-12 pb-5 text-left">
          <motion.h3 
            className="text-2xl font-bold text-white mb-1 transition-colors duration-300 leading-tight"
            layoutId={`title-${country.name}`}
          >
            Jobs in {country.name}
          </motion.h3>
          <div className="flex items-center text-sm text-white/85 font-semibold tracking-wide transition-colors duration-300">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
            {country.jobs.toLocaleString()} Openings
          </div>
        </div>

        {/* Hover Shine Effect - Reduced for Light Mode */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 transition-opacity duration-500 pointer-events-none" />
      </Link>
    </motion.div>
  );
}
