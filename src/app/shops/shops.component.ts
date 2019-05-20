import {Component, OnInit} from '@angular/core';
import {Shop} from '../model/shop';
import {ShopService} from '../service/shop.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {
  shops: Shop[];

  constructor(private shopService: ShopService) {  }

  ngOnInit() {
    this.getShops();
  }

  getShops(): void {
    this.shopService.getShops()
      .subscribe(shopsResponse => {
        this.shops = shopsResponse['_embedded'].shops;
      });
  }
}
