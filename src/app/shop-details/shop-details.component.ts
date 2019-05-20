import {Component, OnInit} from '@angular/core';
import {Shop} from '../model/shop';
import {ShopService} from '../service/shop.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})

export class ShopDetailsComponent implements OnInit {
  shop: Shop;

  constructor(private route: ActivatedRoute,
              private shopService: ShopService) { }

  ngOnInit() {
    this.getShop();
  }

  getShop(): void {
    const shopId = this.route.snapshot.paramMap.get('id');

    this.shopService.getShop(shopId)
      .subscribe(shop => {
        this.shop = shop;
        console.log('this.shop: ' + this.shop);
      });
  }

  /*
  save(shopId: string, name: string, type: string, price: number, description: string): void {
    this.productService.saveProduct({ name, type, price, description } as Product, productId).subscribe();
    this.location.back();
  }
  */
}
