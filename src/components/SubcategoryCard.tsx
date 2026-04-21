import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface SubcategoryCardProps {
  title: string;
  index: number;
  onClick?: () => void;
  key?: string;
}

export default function SubcategoryCard({ title, index, onClick }: SubcategoryCardProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="w-full bg-surface border border-border-theme rounded-xl px-5 py-4 flex items-center justify-between group hover:border-blue-400 hover:shadow-sm transition-all duration-200 text-left active:scale-[0.98]"
    >
      <span className="text-text-main font-bold group-hover:text-blue-600 transition-colors">
        {title}
      </span>
      <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
    </motion.button>
  );
}
