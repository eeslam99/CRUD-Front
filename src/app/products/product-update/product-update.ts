import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../services/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-update',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-update.html',
  styleUrl: './product-update.css'
})
export class ProductUpdate implements OnInit {
  productForm: FormGroup;
  productId: number = 0;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      stock: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct();
  }

  loadProduct(): void {
    this.loading = true;
    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading product:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load product data.',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/products']);
        });
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      this.productService.updateProduct(this.productId, product).subscribe({
        next: (updatedProduct) => {
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'The product has been updated successfully.',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/products']);
          });
        },
        error: (err) => {
          console.error('Error updating product:', err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to update the product.',
            confirmButtonText: 'OK'
          });
        }
      });
    } else {
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }
}
