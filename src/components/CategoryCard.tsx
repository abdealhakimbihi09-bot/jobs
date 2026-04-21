import { motion } from "motion/react";
import { 
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
  ChevronRight,
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
import { Category } from "../types";
import { Link, useParams } from "react-router-dom";

interface CategoryCardProps {
  category: Category;
  index: number;
  country: string;
  key?: any;
}

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

export default function CategoryCard({ category, index, country }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Briefcase;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        duration: 0.5, 
        delay: index < 12 ? index * 0.05 : 0,
        ease: [0.23, 1, 0.32, 1]
      }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link
        to={`/jobs/${country}/category/${category.slug}`}
        className="flex items-center p-6 bg-white rounded-[32px] shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-gray-100 hover:border-blue-500/50 hover:shadow-[0_10px_40px_rgb(0,0,0,0.04)] transition-all duration-500 active:scale-[0.97] h-full"
      >
        {/* Left: Icon Container with Glow */}
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 flex items-center justify-center text-gray-700 bg-gray-50 rounded-3xl transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 shadow-sm">
            <Icon className="w-8 h-8 stroke-[1.5]" />
          </div>
          {/* Subtle icon shadow/glow on hover */}
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100 -z-10" />
        </div>

        {/* Right: Content */}
        <div className="ml-6 flex-grow min-w-0">
          <h4 className="text-[18px] font-extrabold text-gray-900 leading-tight tracking-tight group-hover:text-blue-600 transition-colors duration-300 truncate">
            {category.name}
          </h4>
          <div className="flex items-center gap-2 mt-1.5 focus-within:z-10">
            <span className="text-[13px] text-gray-600 font-bold tracking-tight">
              {category.jobs.toLocaleString()} {category.jobs === 1 ? 'Open Position' : 'Open Positions'}
            </span>
            <div className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-blue-400 transition-colors" />
            <span className="text-[11px] text-blue-600 font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
              View All
            </span>
          </div>
        </div>

        {/* Right Arrow */}
        <div className="ml-2 w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-500 text-blue-600">
          <ChevronRight className="w-4 h-4 translate-x-[-1px] group-hover:translate-x-0 transition-transform duration-500" />
        </div>
      </Link>
    </motion.div>
  );
}
