import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SubCategory } from '../Models/SubCategory';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  private baseURL = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAllSubCategories(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(`${this.baseURL}/api/subcategories`);
  }

  getSubCategoryById(id: number): Observable<SubCategory> {
    return this.http.get<SubCategory>(`${this.baseURL}/api/subcategories/${id}`);
  }

  getSubCategoriesByCategoryId(categoryId: number): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(`${this.baseURL}/api/subcategories/by-category/${categoryId}`);
  }

  createSubCategory(subCategory: SubCategory): Observable<SubCategory> {
    return this.http.post<SubCategory>(`${this.baseURL}/api/subcategories`, subCategory);
  }

  updateSubCategory(id: number, subCategory: SubCategory): Observable<SubCategory> {
    return this.http.put<SubCategory>(`${this.baseURL}/api/subcategories/${id}`, subCategory);
  }

  deleteSubCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/api/subcategories/${id}`);
  }
}
