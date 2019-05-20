import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { Product } from '../model/product';
import { ProductService } from '../service/product.service';


@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit() {
  }

  add(name: string, type: string, price: number, description: string): void {
    this.productService.addProduct({ name, type, price, description } as Product).subscribe();
    this.router.navigate(['/products']);
  }

}
