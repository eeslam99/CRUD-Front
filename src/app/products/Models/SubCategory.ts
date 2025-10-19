import { Category } from './Category';

export interface SubCategory {
  id?: number;
  name: string;
  description?: string;
  categoryId: number;
  category?: Category;
}
