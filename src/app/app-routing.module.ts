import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { EmployeesComponent } from './employees/employees.component';
import { ShopsComponent } from './shops/shops.component';
import { PurchasesComponent } from './purchases/purchases.component';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import {EmployeeDetailsComponent} from './employee-details/employee-details.component';
import {PurchaseDetailsComponent} from './purchase-details/purchase-details.component';

import { ProductNewComponent } from './product-new/product-new.component';
import {ShopNewComponent} from './shop-new/shop-new.component';
import {PurchaseNewComponent} from './purchase-new/purchase-new.component';
import {EmployeeNewComponent} from './employee-new/employee-new.component';

import {AmountOfProductsComponent} from './amount-of-products/amount-of-products.component';



const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },

  { path: 'products', component: ProductsComponent },
  { path: 'shops', component: ShopsComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'purchases', component: PurchasesComponent },

  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'shops/:id', component: ShopDetailsComponent },
  { path: 'employees/:id', component: EmployeeDetailsComponent },
  { path: 'purchases/:id', component: PurchaseDetailsComponent },

  { path: 'products-new', component: ProductNewComponent },
  { path: 'shop-new', component: ShopNewComponent },
  { path: 'employee-new', component: EmployeeNewComponent },
  { path: 'purchase-new', component: PurchaseNewComponent },

  { path: 'shops/:shopId/products', component: AmountOfProductsComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
