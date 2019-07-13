import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menu;

  constructor() {
    this.menu = [
      // {
      //   caption: 'Dashboard',
      //   link: 'dashboard',
      //   dropDownList: [{
      //     caption: 'List of shops',
      //     link: 'products'
      //   }, {
      //     caption: 'Create shop record',
      //     link: 'shops-new',
      //   }]
      // },
      {
        caption: 'Products',
        link: 'products',
        dropDownList: [{
          caption: 'List of products',
          link: 'products'
        }, {
          caption: 'Create product record',
          link: 'products-new',
        }]
      },
      {
        caption: 'Shops',
        link: 'shops',
        dropDownList: [{
          caption: 'List of shops',
          link: 'shops'
        }, {
          caption: 'Create shop record',
          link: 'shop-new',
        }]
      },
      {
        caption: 'Employees',
        link: 'employees',
        dropDownList: [{
          caption: 'List of employees',
          link: 'employees'
        }, {
          caption: 'Create employee record',
          link: 'employee-new',
        }]
      },
      {
        caption: 'Purchases',
        link: 'purchases',
        dropDownList: [{
          caption: 'List of purchases',
          link: 'purchases'
        }, {
          caption: 'Create purchase record',
          link: 'purchase-new',
        }]
      }
    ];
  }

  ngOnInit() {
  }

}
