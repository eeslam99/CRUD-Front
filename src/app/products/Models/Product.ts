import { Category } from './Category';
import { SubCategory } from './SubCategory';

export interface Product {
  id?: number;
  name?: string;
  price?: number;
  description?: string;
  stock?: number;
  countryOfOrigin?: string;
  categoryId?: number;
  subCategoryId?: number;
  category?: Category;
  subCategory?: SubCategory;
  createdAt?: string;
  updatedAt?: string | null;
}