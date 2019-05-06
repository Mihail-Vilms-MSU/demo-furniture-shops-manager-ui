import { Component, OnInit } from '@angular/core';
import {Purchase} from '../model/purchase';
import {PurchaseService} from '../service/purchase.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {
  purchases: Purchase[];

  // pagination settings
  currentPage: number;
  sizeOfPage: number;
  totalElements: number;
  totalPages: number;

  sortField: string;
  orderField: string;

  pages: number[]; // numbers of all pages [1;2...8]

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit() {
    this.getPurchases(0, 100);
  }

  getPurchases(page, size): void {

    this.purchaseService.getPurchases(page, size, null, null)
      .subscribe(response => {
        console.log('~~~ ~~~ response: ' + JSON.stringify(response));

        this.purchases = response['_embedded']['purchases']
          .map(purchaseJson => {
            const purchase = purchaseJson;
            purchase.shop = purchaseJson['shop'];
            purchase.employee = purchaseJson['employee'];
            return purchase;
          });

        this.currentPage = response['page']['number'];
        this.totalPages = response['page']['totalPages'];

        this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);
      });
  }
}
