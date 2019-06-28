import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ShopService} from '../service/shop.service';
import {Shop} from '../model/shop';

@Component({
  selector: 'app-shop-new',
  templateUrl: './shop-new.component.html',
  styleUrls: ['./shop-new.component.css']
})
export class ShopNewComponent implements OnInit {
  private fieldsConfig = [
    { field: 'name',
      caption: 'Shop title',
      required: true,
      placeholder: 'Shop title'
    },
    { field: 'state',
      caption: 'State',
      required: true,
      placeholder: 'State'
    },
    { field: 'city',
      caption: 'City',
      required: true,
      placeholder: 'City'
    },
    {
      field: 'address',
      caption: 'Address',
      required: true,
      placeholder: 'Address'
    },
    { field: 'phone',
      caption: 'Phone',
      required: true,
      placeholder: 'Phone'
    }
  ];

  constructor(
    private router: Router,
    private shopService: ShopService
  ) { }

  ngOnInit() {}

  add() {
    let jsonShop = {};

    this.fieldsConfig.forEach(fieldInfo => {
      jsonShop[fieldInfo.field] = fieldInfo['value'];
    });
    this.shopService.addShop(jsonShop as Shop).subscribe(() => {
      this.router.navigate(['/shops']);
    });
  }
}
