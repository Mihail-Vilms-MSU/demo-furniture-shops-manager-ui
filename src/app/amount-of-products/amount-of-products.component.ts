import { Component, OnInit } from '@angular/core';
import {ShopService} from '../service/shop.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-amount-of-products',
  templateUrl: './amount-of-products.component.html',
  styleUrls: ['./amount-of-products.component.css']
})

export class AmountOfProductsComponent implements OnInit {
  productsList = [];
  addItemsMap = {};

  constructor(private route: ActivatedRoute,
              private shopService: ShopService) { }

  ngOnInit() {
    this.getProductsForShop();
  }

  getProductsForShop(): void {
    const shopId = this.route.snapshot.paramMap.get('shopId');
    this.shopService.getProductsInShop(shopId).subscribe(response => {
      this.productsList = response['_embedded']['amounts'];
    });
  }

  addProductsToStorage(): void {
    const shopId = this.route.snapshot.paramMap.get('shopId');
    this.shopService.addProductsToShopStorage(shopId, this.addItemsMap);
  }

}
