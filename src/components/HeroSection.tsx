import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 text-center transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full mb-6 tracking-wide uppercase transition-colors duration-300">
          Career Opportunities
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-text-main tracking-tight mb-4 transition-colors duration-300">
          Job Vacancies <span className="text-blue-600">Globally</span>
        </h1>
        <p className="text-xl text-text-muted max-w-2xl mx-auto transition-colors duration-300 leading-relaxed">
          Explore thousands of job opportunities across top-tier international markets.
        </p>
      </motion.div>
    </section>
  );
}
