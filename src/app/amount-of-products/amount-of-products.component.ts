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
  responseData;


  constructor(private route: ActivatedRoute,
              private shopService: ShopService) { }

  ngOnInit() {
    this.getProductsForShop();
  }

  getProductsForShop(): void {
    const shopId = this.route.snapshot.paramMap.get('shopId');
    this.shopService.getProductsInShop(shopId).subscribe(response => {
      this.productsList = response['_embedded']['amounts'];
      console.log(JSON.stringify(this.productsList[0]));
    });
    // this.productsList = JSON.stringify(this.responseData);
  }

  addProductsToStorage(): void {
    const shopId = this.route.snapshot.paramMap.get('shopId');
    console.log('~~~ 123 ) this.addItemsMap: ' + JSON.stringify(this.addItemsMap));

    this.shopService.addProductsToShopStorage(shopId, this.addItemsMap);
    // this.addItemsMap = null;
  }

}
