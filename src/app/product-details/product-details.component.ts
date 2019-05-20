import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Product} from '../model/product';
import {ProductService} from '../service/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(productId)
      .subscribe(product => {
        this.product = product;
      });
  }

  save(productId: string, name: string, type: string, price: number, description: string): void {
    this.productService.saveProduct({ name, type, price, description } as Product, productId).subscribe();
    this.location.back();
  }
}
