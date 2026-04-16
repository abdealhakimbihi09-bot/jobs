import { useParams, useNavigate } from "react-router-dom";
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
import Header from "./Header";

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
  
  const detail = categoryDetails[categorySlug || ""];
  
  if (!detail) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Category not found</h2>
          <p className="text-gray-500 mb-8">Missing slug: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{categorySlug}</span></p>
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const Icon = iconMap[detail.icon] || Briefcase;

  return (
    <div className="min-h-screen bg-white transition-colors duration-300">
      <Header />
      
      <main className="max-w-5xl mx-auto px-6 py-10 md:py-16">
        {/* Header Section */}
        <div className="relative mb-12 flex flex-col items-center">
          {/* Back Button - Top Right Positioning */}
          <div className="absolute right-0 top-[-8px] md:top-0">
            <button 
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2 text-gray-700 shadow-sm border border-gray-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-bold">Back</span>
            </button>
          </div>

          <div className="flex flex-col items-center text-center pt-12 md:pt-0">
            {/* Category Icon */}
            <div className="w-20 h-20 bg-blue-50 rounded-[28px] flex items-center justify-center text-blue-600 mb-6 shadow-sm ring-4 ring-blue-50/50">
              <Icon className="w-10 h-10 stroke-[1.5]" />
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold text-blue-600 tracking-tight">
              {detail.title}
            </h1>
          </div>
        </div>

        {/* Subcategory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {detail.items
            .filter(item => item !== "Government Jobs For Women")
            .map((item, index) => (
              <SubcategoryCard 
                key={item} 
                title={item} 
                index={index} 
              />
            ))}
        </div>
      </main>
    </div>
  );
}
