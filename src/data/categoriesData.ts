import { CategoriesByCountry, Category } from "../types";

export const fullCategoryList: Category[] = [
  { id: "1", name: "Restaurants & Chefs", slug: "restaurants", jobs: 3810, icon: "restaurant" },
  { id: "2", name: "Work from Home Jobs", slug: "work-from-home", jobs: 558, icon: "remote" },
  { id: "3", name: "Human Resources Jobs", slug: "human-resources", jobs: 1592, icon: "hr" },
  { id: "4", name: "Women Jobs", slug: "women", jobs: 711, icon: "women" },
  { id: "5", name: "Government Jobs", slug: "government", jobs: 1060, icon: "government" },
  { id: "6", name: "Media and Press Jobs", slug: "media", jobs: 123, icon: "media" },
  { id: "7", name: "Administrative Jobs", slug: "admin", jobs: 33133, icon: "admin" },
  { id: "8", name: "Driving Jobs", slug: "driving", jobs: 2505, icon: "driving" },
  { id: "9", name: "Public Relations Jobs", slug: "pr", jobs: 3549, icon: "pr" },
  { id: "10", name: "Call Center Jobs", slug: "call-center", jobs: 2509, icon: "callcenter" },
  { id: "11", name: "Other Jobs", slug: "other", jobs: 35634, icon: "other" },
  { id: "12", name: "Industrial Jobs", slug: "industrial", jobs: 14526, icon: "industrial" },
  { id: "13", name: "Law Jobs", slug: "law", jobs: 1769, icon: "law" },
  { id: "14", name: "Teaching Jobs", slug: "teaching", jobs: 11049, icon: "teaching" },
  { id: "15", name: "Skilled Laborers Jobs", slug: "labor", jobs: 10438, icon: "labor" },
  { id: "16", name: "IT Jobs", slug: "it", jobs: 6522, icon: "it" },
  { id: "17", name: "Programming", slug: "programming", jobs: 5900, icon: "programming" },
  { id: "18", name: "Procurement Jobs", slug: "procurement", jobs: 2923, icon: "procurement" },
  { id: "19", name: "Sales Jobs", slug: "sales", jobs: 8550, icon: "sales" },
  { id: "20", name: "Marketing Jobs", slug: "marketing", jobs: 11120, icon: "marketing" },
  { id: "21", name: "Translation Jobs", slug: "translation", jobs: 183, icon: "translation" },
  { id: "22", name: "Art & Design Jobs", slug: "design", jobs: 6369, icon: "design" },
  { id: "23", name: "Healthcare Medical Jobs", slug: "medical", jobs: 1782, icon: "medical" },
  { id: "24", name: "Accounting and Finance", slug: "finance", jobs: 3017, icon: "finance" },
  { id: "25", name: "Engineering Jobs", slug: "engineering", jobs: 9857, icon: "engineering" }
];

export const categoriesByCountry: CategoriesByCountry = {
  usa: fullCategoryList,
  canada: fullCategoryList.map(c => ({ ...c, jobs: Math.floor(c.jobs * 0.9) })),
  germany: fullCategoryList.map(c => ({ ...c, jobs: Math.floor(c.jobs * 0.8) })),
  uk: fullCategoryList.map(c => ({ ...c, jobs: Math.floor(c.jobs * 0.85) })),
  france: fullCategoryList.map(c => ({ ...c, jobs: Math.floor(c.jobs * 0.75) })),
  australia: fullCategoryList.map(c => ({ ...c, jobs: Math.floor(c.jobs * 0.7) })),
  netherlands: fullCategoryList.map(c => ({ ...c, jobs: Math.floor(c.jobs * 0.6) })),
  switzerland: fullCategoryList.map(c => ({ ...c, jobs: Math.floor(c.jobs * 0.5) })),
  sweden: fullCategoryList.map(c => ({ ...c, jobs: Math.floor(c.jobs * 0.45) })),
  norway: fullCategoryList.map(c => ({ ...c, jobs: Math.floor(c.jobs * 0.4) })),
  denmark: fullCategoryList.map(c => ({ ...c, jobs: Math.floor(c.jobs * 0.35) })),
  ireland: fullCategoryList.map(c => ({ ...c, jobs: Math.floor(c.jobs * 0.3) })),
  singapore: fullCategoryList.map(c => ({ ...c, jobs: Math.floor(c.jobs * 0.55) })),
  japan: fullCategoryList.map(c => ({ ...c, jobs: Math.floor(c.jobs * 0.65) })),
  "south korea": fullCategoryList.map(c => ({ ...c, jobs: Math.floor(c.jobs * 0.6) })),
  uae: fullCategoryList.map(c => ({ ...c, jobs: Math.floor(c.jobs * 0.95) })),
};

export const defaultCategories = fullCategoryList;
