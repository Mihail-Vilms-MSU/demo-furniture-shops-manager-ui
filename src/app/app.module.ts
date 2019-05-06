import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeaderComponent } from './header/header.component';

import { EmployeesComponent } from './employees/employees.component';
import { ProductsComponent } from './products/products.component';
import { ShopsComponent } from './shops/shops.component';
import { PurchasesComponent } from './purchases/purchases.component';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

import { ProductNewComponent } from './product-new/product-new.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeDetailsComponent,
    HeaderComponent,
    ProductsComponent,
    ShopsComponent,
    PurchasesComponent,
    ProductDetailsComponent,
    ProductNewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
