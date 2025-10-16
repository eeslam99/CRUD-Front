import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductsRoutingModule } from './products-routing-module';

// Components
import { ProductList } from './product-list/product-list';
import { ProductDetails } from './product-details/product-details';
import { ProductCreate } from './product-create/product-create';
import { ProductUpdate } from './product-update/product-update';
import { ProductDelete } from './product-delete/product-delete';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

// PrimeNG Services
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    ProductList,
    ProductDetails,
    ProductCreate,
    ProductUpdate,
    ProductDelete
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ProductsRoutingModule,
    TableModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    MessageModule,
    TagModule,
    TooltipModule,
    ConfirmDialogModule,
    ToastModule,
    IconFieldModule,
    InputIconModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class ProductsModule { }
