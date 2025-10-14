import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../services/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  products: Product[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        console.log('Products loaded successfully:', data);
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Full error object:', err);
        if (err.status === 0) {
          this.error = 'Failed to connect to API. Check CORS or SSL certificate.';
        } else if (err.status === 404) {
          this.error = 'API endpoint not found (404)';
        } else {
          this.error = `Failed to load products: ${err.status} - ${err.message}`;
        }
        this.loading = false;
      }
    });
  }
  deleteProduct(id: number): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This will delete the product permanently!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts(); 
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The product has been deleted successfully.',
            confirmButtonText: 'OK'
          });
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to delete the product.',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  });
}
  
}