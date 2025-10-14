import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../services/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
  product: Product | null = null;
  loading: boolean = false;
  productId: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct();
  }

  loadProduct(): void {
    this.loading = true;
    this.productService.getProductById(this.productId).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading product:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load product details.',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/products']);
        });
        this.loading = false;
      }
    });
  }

  onDelete(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(this.productId).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'The product has been deleted.',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate(['/products']);
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

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
