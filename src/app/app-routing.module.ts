import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { EmployeesComponent } from './employees/employees.component';
import { ShopsComponent } from './shops/shops.component';
import {PurchasesComponent} from './purchases/purchases.component';

import { ProductDetailsComponent } from './product-details/product-details.component';

import { ProductNewComponent } from './product-new/product-new.component';


const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },

  { path: 'employees', component: EmployeesComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shops', component: ShopsComponent },
  { path: 'purchases', component: PurchasesComponent },

  { path: 'products/:id', component: ProductDetailsComponent },

  { path: 'products-new', component: ProductNewComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
