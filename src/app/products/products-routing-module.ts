import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { ProductDetails } from './product-details/product-details';
import { ProductCreate } from './product-create/product-create';
import { ProductUpdate } from './product-update/product-update';

const routes: Routes = [
  { path: '', component: ProductList },
  { path: 'create', component: ProductCreate },
  { path: ':id', component: ProductDetails },
  { path: 'update/:id', component: ProductUpdate }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
