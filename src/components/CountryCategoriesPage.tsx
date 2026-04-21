import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import CategoryCard from "./CategoryCard";
import { categoriesByCountry, defaultCategories } from "../data/categoriesData";

export default function CountryCategoriesPage() {
  const { countrySlug } = useParams();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();
  
  const countryName = countrySlug ? countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1) : "";
  const categories = categoriesByCountry[countrySlug?.toLowerCase() || ""] || defaultCategories;

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Initially show 10 categories
  const INITIAL_COUNT = 10;
  const displayedCategories = showAll ? filteredCategories : filteredCategories.slice(0, INITIAL_COUNT);

  return (
    <div className="min-h-screen bg-bg transition-colors duration-300">
      <main className="max-w-md mx-auto px-6 pt-2 pb-8 sm:max-w-7xl">
        {/* Back Button */}
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-highlight-bg dark:bg-surface rounded-xl hover:opacity-80 transition-all text-text-main shadow-sm border border-border-theme font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <h1 className="text-[28px] font-extrabold text-text-main mb-8 tracking-tight">
          Jobs in {countryName}
        </h1>

        {/* Categories List */}
        <div className="flex flex-col gap-5">
          <AnimatePresence mode="popLayout">
            {displayedCategories.length > 0 ? (
              displayedCategories.map((category, index) => (
                <CategoryCard 
                  key={category.id || category.name} 
                  category={category} 
                  index={index}
                  country={countrySlug || ""}
                />
              ))
            ) : (
              <div className="py-20 text-center">
                <p className="text-text-muted text-lg font-medium">No results found for "{searchQuery}"</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-blue-600 font-bold hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Show More / Less Control */}
        {filteredCategories.length > INITIAL_COUNT && (
          <div className="mt-8 mb-12 text-center">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 text-blue-600 font-bold text-base hover:opacity-80 transition-opacity"
            >
              {showAll ? (
                <>
                  Show Less Categories
                  <ChevronUp className="w-5 h-5" />
                </>
              ) : (
                <>
                  Show More Categories
                  <ChevronDown className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
