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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index < 10 ? index * 0.05 : 0 }}
    >
      <Link
        to={`/jobs/${country}/category/${category.slug}`}
        className="flex items-center p-6 bg-surface rounded-[24px] shadow-theme border border-border-theme hover:shadow-theme-hover transition-all duration-300 active:scale-[0.98]"
      >
        {/* Left: Icon */}
        <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center text-text-main bg-highlight-bg rounded-2xl">
          <Icon className="w-8 h-8 stroke-[1.25]" />
        </div>

        {/* Right: Content */}
        <div className="ml-5 flex-grow">
          <h4 className="text-[17px] font-bold text-text-main leading-tight tracking-tight">
            {category.name}
          </h4>
          <p className="text-[13px] text-text-muted font-semibold mt-1">
            {category.jobs.toLocaleString()} {category.jobs === 1 ? 'Open Position' : 'Open Positions'}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
