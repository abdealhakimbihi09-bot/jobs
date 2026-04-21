import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import CountriesList from "./components/CountriesList";
import CountryCategoriesPage from "./components/CountryCategoriesPage";
import CategoryDetailPage from "./components/CategoryDetailPage";
import ApplicationSuccess from "./components/ApplicationSuccess";
import { ThemeProvider } from "@/context/ThemeContext";
import { SearchProvider } from "@/context/SearchContext";

function LandingPage() {
  return (
    <div className="min-h-screen bg-bg transition-colors duration-300">
      <main className="content-wrapper">
        <HeroSection />
        <CountriesList />
      </main>
      <footer className="bg-section border-t border-border-theme text-text-muted py-16 transition-colors duration-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold">J</span>
            </div>
            <span className="text-lg font-bold text-text-main tracking-tight">JOBLINK</span>
          </div>
          <p className="text-sm">© 2026 JOBLINK International. Built with trust and precision.</p>
          <div className="mt-6 flex justify-center gap-6 text-sm font-medium">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
            <a href="#" className="hover:text-blue-600">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SearchProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/jobs/:countrySlug" element={<CountryCategoriesPage />} />
            <Route path="/jobs/:countrySlug/category/:categorySlug" element={<CategoryDetailPage />} />
            <Route path="/application-success" element={<ApplicationSuccess />} />
          </Routes>
        </Router>
      </SearchProvider>
    </ThemeProvider>
  );
}
