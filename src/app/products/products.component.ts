import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import {EventEmitterService} from "../service/event-emitter.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];

  currentPage: number;
  sizeOfPage: number;
  numberOfElements: number;
  numberOfPages: number;

  sortField: string;
  sortOrder: string;

  pages: number[]; // numbers of all pages [1;2...]

  inputSearch: string;

  constructor(
    private productService: ProductService,
    private eventEmitterService: EventEmitterService
  ) { }

  ngOnInit() {
    this.getProducts(0, 10, 'name', 'asc', null);

    this.eventEmitterService.invokeLiveSearchOnProducts.subscribe((searchInput) => {
      this.getProducts(0, this.sizeOfPage, this.sortField, this.sortOrder, searchInput);
    });
  }

  getProducts(page, size, sortField, sortOrder, searchInput): void {
    this.productService.getProducts(page, size, sortField, sortOrder, searchInput)
      .subscribe(response => {
        this.products = response['_embedded']['products'];

        this.currentPage    = response['page']['number'];
        this.sizeOfPage     = response['page']['size'];
        this.numberOfElements  = response['page']['totalElements'];
        this.numberOfPages     = response['page']['totalPages'];

        this.sortField = sortField;
        this.sortOrder = sortOrder;

        this.pages = Array.from(Array(this.numberOfPages), (x, index) => index + 1);

        this.inputSearch = searchInput;
      });
  }

  getAnotherPage(page): void {
    this.getProducts(page, this.sizeOfPage, this.sortField, this.sortOrder, this.inputSearch);
  }

  getAnotherSortOrder(sortField): void {
    let sortOrder = 'asc';
    if (sortField === this.sortField && this.sortOrder === 'asc') {
      sortOrder = 'desc';
    }

    this.getProducts(this.currentPage, this.sizeOfPage, sortField, sortOrder, this.inputSearch);
  }

}
