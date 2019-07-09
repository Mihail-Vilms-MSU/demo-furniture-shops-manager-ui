import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Product} from '../model/product';
import {ProductService} from '../service/product.service';


@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {
  private fieldsConfig = [
    { field: 'name',
      caption: 'Product Title',
      type: 'input',
      required: true,
      placeholder: 'Product Title',
      class: 'col-md-6 mb-3',
      update: true
    },
    { field: 'type',
      caption: 'Category',
      type: 'input',
      required: true,
      placeholder: 'Category',
      class: 'col-md-6 mb-3',
      update: true
    },
    { field: 'price',
      caption: 'Price',
      type: 'input',
      required: true,
      placeholder: 'Price',
      class: 'col-md-6 mb-3',
      update: true
    },
    {
      field: 'description',
      caption: 'Description',
      type: 'textarea',
      required: true,
      placeholder: 'Description',
      class: 'col-md-12 mb-3',
      update: true
    },

  ];

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit() {
  }

  add(): void {
    let jsonProduct = {};

    this.fieldsConfig.forEach(fieldInfo => {
      if (!fieldInfo['update']) return false;

      jsonProduct[fieldInfo.field] = fieldInfo['value'];
    });

    this.productService.addProduct(jsonProduct as Product).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

}
