import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { Product } from '../model/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
  }

  add(name: string, type: string, price: number, description: string): void {
    console.log('name: ' + name);
    console.log('type: ' + type);
    console.log('description: ' + description);
    // name = name.trim();
    // if (!name) { return; }
    this.productService.addProduct({ name, type, price, description } as Product).subscribe();
  }

}
