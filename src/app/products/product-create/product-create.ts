import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { SubCategoryService } from '../services/subcategory.service';
import { Product } from '../Models/Product';
import { Category } from '../Models/Category';
import { SubCategory } from '../Models/SubCategory';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-create',
  standalone: false,
  templateUrl: './product-create.html',
  styleUrls: ['./product-create.css']
})

export class ProductCreate implements OnInit {
  productForm: FormGroup;
  countries: string[] = ['Egypt', 'United States', 'Canada', 'Germany', 'France', 'Italy', 'India', 'Japan', 'Vietnam', 'South Korea', 'Mexico', 'China'];
  filteredCountries: string[] = [];
  
  // Categories and SubCategories
  categories: Category[] = [];
  allSubCategories: SubCategory[] = [];
  filteredSubCategories: SubCategory[] = [];
  selectedCategory: Category | null = null;
  selectedSubCategory: SubCategory | null = null;

  constructor(
    private fb: FormBuilder, 
    private productService: ProductService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      countryOfOrigin: ['', [Validators.required, Validators.minLength(2)]]
    });
  }
  
  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        // Handle wrapped response structure: {isSuccess, data, errors}
        let data;
        if (response && (response as any).isSuccess !== undefined) {
          // Response is wrapped
          data = (response as any).data;
        } else {
          // Response is direct data
          data = response;
        }

        // Ensure data is always an array
        if (Array.isArray(data)) {
          this.categories = data;
        } else if (data && typeof data === 'object') {
          // If it's an object, try to extract array from common properties
          if ((data as any).data && Array.isArray((data as any).data)) {
            this.categories = (data as any).data;
          } else if ((data as any).items && Array.isArray((data as any).items)) {
            this.categories = (data as any).items;
          } else if ((data as any).results && Array.isArray((data as any).results)) {
            this.categories = (data as any).results;
          } else {
            // Convert object to array if needed
            this.categories = Object.values(data);
          }
        } else {
          this.categories = [];
        }
      },
      error: (err) => {
        this.categories = [];
        
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Failed to load categories. ${err.status}: ${err.statusText || err.message}`,
          confirmButtonText: 'OK'
        });
      }
    });
  }

  onCategoryChange(event: any): void {
    this.selectedCategory = event.value;
    
    if (this.selectedCategory && this.selectedCategory.id) {
      // Use the single category method to get subcategories
      this.subCategoryService.getSubCategoriesByCategoryId(this.selectedCategory.id).subscribe({
        next: (response) => {
          // Handle wrapped response structure: {isSuccess, data, errors}
          let data;
          if (response && (response as any).isSuccess !== undefined) {
            // Response is wrapped
            data = (response as any).data;
          } else {
            // Response is direct data
            data = response;
          }

          // Ensure data is always an array
          if (Array.isArray(data)) {
            this.filteredSubCategories = data;
          } else if (data && typeof data === 'object') {
            // If it's an object, try to extract array from common properties
            if ((data as any).data && Array.isArray((data as any).data)) {
              this.filteredSubCategories = (data as any).data;
            } else if ((data as any).items && Array.isArray((data as any).items)) {
              this.filteredSubCategories = (data as any).items;
            } else {
              this.filteredSubCategories = Object.values(data);
            }
          } else {
            this.filteredSubCategories = [];
          }
          
          // Reset subcategory selection when category changes
          this.selectedSubCategory = null;
        },
        error: (err) => {
          this.filteredSubCategories = [];
          this.selectedSubCategory = null;
        }
      });
    } else {
      this.filteredSubCategories = [];
      this.selectedSubCategory = null;
    }
  }

  onSubCategoryChange(event: any): void {
    this.selectedSubCategory = event.value;
    if (this.selectedSubCategory) {
      this.productForm.patchValue({ 
        subCategoryId: this.selectedSubCategory.id,
        categoryId: this.selectedSubCategory.categoryId 
      });
    }
  }

  search(event: any) {
    const query = event.query.toLowerCase();
    this.filteredCountries = this.countries.filter(c =>
      c.toLowerCase().includes(query)
    );
  }

  onSubmit(): void {
    // Validate form and additional fields
    if (!this.productForm.valid) {
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key)?.markAsTouched();
      });
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill all required fields correctly.',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (!this.selectedCategory) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please select a category.',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (!this.selectedSubCategory) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please select a subcategory.',
        confirmButtonText: 'OK'
      });
      return;
    }
    
    const formValue = this.productForm.value;
    
    // Prepare product object with proper fields
    const product: Product = {
      name: formValue.name,
      description: formValue.description,
      price: formValue.price,
      stock: formValue.stock,
      countryOfOrigin: formValue.countryOfOrigin,
      categoryId: this.selectedSubCategory?.categoryId,
      subCategoryId: this.selectedSubCategory?.id
    };
    
    this.productService.createProduct(product).subscribe({
      next: (newProduct) => {
        Swal.fire({
          icon: 'success',
          title: 'Created!',
          text: 'The product has been created successfully.',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/products']);
        });
        this.productForm.reset();
        this.selectedCategory = null;
        this.selectedSubCategory = null;
        this.filteredSubCategories = [];
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error?.message || 'Failed to create the product.',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }
}
