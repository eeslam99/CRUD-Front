import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../Models/Product';

// PrimeNG Services
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductList implements OnInit {
  products: Product[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

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

  confirmDelete(product: Product): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${product.name}"?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.deleteProduct(product.id!);
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Delete operation cancelled',
          life: 3000
        });
      }
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product deleted successfully',
          life: 3000
        });
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete the product',
          life: 3000
        });
      }
    });
  }
}