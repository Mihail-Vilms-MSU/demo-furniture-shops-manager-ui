import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];

  // pagination settings
  currentPage: number;
  sizeOfPage: number;
  totalElements: number;
  totalPages: number;

  sortField: string;
  orderField: string;

  pages: number[]; // numbers of all pages [1;2...8]

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts(0);
  }

  getProducts(page): void {
    this.productService.getProducts(page, null, null, null)
      .subscribe(response => {
        this.products = response['_embedded']['products'];

        this.currentPage     = response['page']['number'];
        this.sizeOfPage     = response['page']['size'];
        this.totalElements  = response['page']['totalElements'];
        this.totalPages     = response['page']['totalPages'];

        this.pages = Array.from(Array(this.totalPages), (x, index) => index + 1);
      });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.productService.addProduct({ name } as Product);
  }
}
