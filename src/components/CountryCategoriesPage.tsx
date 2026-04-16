import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Header from "./Header";
import CategoryCard from "./CategoryCard";
import { categoriesByCountry, defaultCategories } from "../data/categoriesData";

export default function CountryCategoriesPage() {
  const { countrySlug } = useParams();
  const [showAll, setShowAll] = useState(false);
  
  const countryName = countrySlug ? countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1) : "";
  const categories = categoriesByCountry[countrySlug?.toLowerCase() || ""] || defaultCategories;
  
  // Initially show 10 categories
  const INITIAL_COUNT = 10;
  const displayedCategories = showAll ? categories : categories.slice(0, INITIAL_COUNT);

  return (
    <div className="min-h-screen bg-[#f8f9fa] transition-colors duration-300">
      <Header />
      
      <main className="max-w-md mx-auto px-6 py-8 sm:max-w-7xl">
        <h1 className="text-[28px] font-extrabold text-gray-900 mb-8 tracking-tight">
          Jobs in {countryName}
        </h1>

        {/* Categories List */}
        <div className="flex flex-col gap-5">
          <AnimatePresence mode="popLayout">
            {displayedCategories.map((category, index) => (
              <CategoryCard 
                key={category.id || category.name} 
                category={category} 
                index={index}
                country={countrySlug || ""}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Show More / Less Control */}
        {categories.length > INITIAL_COUNT && (
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
