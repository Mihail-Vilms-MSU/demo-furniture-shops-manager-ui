import {Component, OnInit} from '@angular/core';
import {Shop} from '../model/shop';
import {ShopService} from '../service/shop.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})

export class ShopDetailsComponent implements OnInit {
  shop: Shop;

  private fieldsConfig = [
    { field: 'shopId',
      caption: 'Shop ID',
      required: false,
      readonly: true,
      placeholder: 'Shop ID',
      class: 'col-md-6 mb-3',
      update: false
    },
    { field: 'name',
      caption: 'Shop title',
      required: true,
      placeholder: 'Shop title',
      class: 'col-md-6 mb-3',
      update: true
    },
    { field: 'state',
      caption: 'State',
      required: true,
      placeholder: 'State',
      class: 'col-md-6 mb-3',
      update: true
    },
    { field: 'city',
      caption: 'City',
      required: true,
      placeholder: 'City',
      class: 'col-md-6 mb-3',
      update: true
    },
    {
      field: 'address',
      caption: 'Address',
      required: true,
      placeholder: 'Address',
      class: 'col-md-6 mb-3',
      update: true
    },
    { field: 'phone',
      caption: 'Phone',
      required: true,
      placeholder: 'Phone',
      class: 'col-md-6 mb-3',
      update: true
    },
    {
      field: 'createdAt',
      caption: 'Created at',
      required: false,
      readonly: true,
      placeholder: 'Created at',
      class: 'col-md-6 mb-3',
      update: false
    },
    {
      field: 'updatedAt',
      caption: 'Updated at',
      required: false,
      readonly: true,
      placeholder: 'Updated at',
      class: 'col-md-6 mb-3',
      update: false
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getShop();
  }

  getShop(): void {
    const shopId = this.route.snapshot.paramMap.get('id');

    this.shopService.getShop(shopId)
      .subscribe(shop => {
        this.shop = shop;
        this.fieldsConfig = this.fieldsConfig
          .map(fieldInfo => {
            fieldInfo['value'] = this.shop[fieldInfo['field']];
            return fieldInfo;
          });
      });
  }

  save(): void {
    let jsonShop = {};

    this.fieldsConfig.forEach(fieldInfo => {
      if (!fieldInfo['update']) return false;
      jsonShop[fieldInfo.field] = fieldInfo['value'];
    });
    this.shopService.saveShop(jsonShop as Shop, this.shop.shopId).subscribe(() => {
      this.router.navigate(['/shops']);
    });
  }

  checkShopsStocks():void {
    const shopId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/shops/' + shopId + '/products']);
  }

}
