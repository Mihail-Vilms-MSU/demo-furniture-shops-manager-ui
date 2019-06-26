import {Component, OnInit} from '@angular/core';
import {Shop} from '../model/shop';
import {ShopService} from '../service/shop.service';
import {EventEmitterService} from '../service/event-emitter.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {
  shops: Shop[];

  constructor(
    private shopService: ShopService,
    private eventEmitterService: EventEmitterService
  ) {  }

  ngOnInit() {
    this.getShops();

    this.eventEmitterService.invokeShopComponentFunction.subscribe((params) => {
      if (!params['isAdvanced']) {
        this.getShopsByLiveSearch(params['input']);
      }
    });
  }

  getShops(): void {
    this.shopService.getShops()
      .subscribe(shopsResponse => {
        this.shops = shopsResponse['_embedded'].shops;
      });
  }

  getShopsByLiveSearch(input: string): void {
    this.shopService.getShopsByLiveSearch(input)
      .subscribe(shopsResponse => {
        this.shops = shopsResponse['_embedded'] ? shopsResponse['_embedded'].shops : [];
      });
  }

}
