import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSearch } from "@/context/SearchContext";
import { 
  ArrowLeft, 
  Settings, 
  Monitor, 
  TrendingUp, 
  Megaphone, 
  GraduationCap, 
  Calculator, 
  Briefcase, 
  UsersRound, 
  Truck, 
  Stethoscope, 
  Code, 
  Factory,
  PhoneCall,
  MoreHorizontal,
  Gavel,
  Hammer,
  ShoppingCart,
  Utensils,
  ChefHat,
  Home,
  User,
  Landmark,
  Newspaper,
  MessageSquare,
  Languages,
  Palette
} from "lucide-react";
import { motion } from "motion/react";
import SubcategoryCard from "./SubcategoryCard";
import { categoryDetails } from "../data/categoryDetails";
import JobApplicationModal from "./JobApplicationModal";

const iconMap: { [key: string]: any } = {
  engineering: Settings,
  it: Monitor,
  sales: TrendingUp,
  marketing: Megaphone,
  teaching: GraduationCap,
  finance: Calculator,
  admin: Briefcase,
  hr: UsersRound,
  driving: Truck,
  medical: Stethoscope,
  programming: Code,
  industrial: Factory,
  callcenter: PhoneCall,
  other: MoreHorizontal,
  law: Gavel,
  labor: Hammer,
  procurement: ShoppingCart,
  restaurant: ChefHat,
  remote: Home,
  women: User,
  government: Landmark,
  media: Newspaper,
  pr: MessageSquare,
  translation: Languages,
  design: Palette,
};

export default function CategoryDetailPage() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useSearch();
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const detail = categoryDetails[categorySlug || ""];
  
  // Fallback if category is not found
  const displayDetail = detail || {
    slug: categorySlug || "unknown",
    title: "Category",
    icon: "other",
    items: ["General Jobs", "Entry Level Jobs", "Remote Jobs"]
  };

  const Icon = iconMap[displayDetail.icon] || Briefcase;

  const filteredItems = (displayDetail.items || [])
    .filter(item => item !== "Government Jobs For Women")
    .filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-bg transition-colors duration-300">
      <main className="max-w-5xl mx-auto px-6 pt-6 pb-10 md:pt-10 md:pb-16">
        <div className="relative mb-12 flex flex-col items-center">
          {/* Back Button - Top Right Positioning */}
          <div className="absolute right-0 top-[-8px] md:top-0">
            <button 
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-highlight-bg dark:bg-surface rounded-xl hover:opacity-80 transition-all flex items-center gap-2 text-text-main shadow-sm border border-border-theme"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-bold">Back</span>
            </button>
          </div>

          <div className="flex flex-col items-center text-center pt-12 md:pt-0">
            {/* Category Icon */}
            <div className="w-20 h-20 bg-highlight-bg dark:bg-blue-900/20 rounded-[28px] flex items-center justify-center text-blue-600 mb-6 shadow-sm ring-4 ring-blue-50/50">
              <Icon className="w-10 h-10 stroke-[1.5]" />
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold text-blue-600 tracking-tight">
              {displayDetail.title}
            </h1>
            {!detail && (
              <p className="mt-4 text-text-muted font-medium">Content temporarily unavailable - showing defaults</p>
            )}
          </div>
        </div>

        {/* Subcategory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <SubcategoryCard 
                key={item} 
                title={item} 
                index={index} 
                onClick={() => handleApplyClick(item)}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-text-muted text-lg font-medium">
                {filteredItems.length === 0 && searchQuery ? `No jobs matching "${searchQuery}"` : "Content temporarily unavailable"}
              </p>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-blue-600 font-bold hover:underline"
                >
                  Clear filter
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      <JobApplicationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle={selectedJob || ""}
      />
    </div>
  );
}
