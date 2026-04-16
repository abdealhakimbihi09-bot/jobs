export interface Country {
  name: string;
  jobs: number;
  image: string;
}

export interface Category {
  id?: string;
  name: string;
  slug: string;
  jobs: number;
  icon: string;
}

export interface Subcategory {
  title: string;
}

export interface CategoryDetail {
  slug: string;
  title: string;
  icon: string;
  items: string[];
}

export interface CategoriesByCountry {
  [key: string]: Category[];
}
