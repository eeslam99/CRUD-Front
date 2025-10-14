import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../services/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-create',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css'
})

export class ProductCreate implements OnInit {
  productForm: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      stock: ['', [Validators.required, Validators.min(0)]]
    });
  }
  ngOnInit(): void {}

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
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
        },
        error: (err) => {
          console.error('Error creating product:', err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to create the product.',
            confirmButtonText: 'OK'
          });
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }
}
