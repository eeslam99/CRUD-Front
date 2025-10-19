import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category } from '../Models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseURL = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseURL}/api/categories`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseURL}/api/categories/${id}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseURL}/api/categories`, category);
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseURL}/api/categories/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/api/categories/${id}`);
  }
}
