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

  currentPage: number;
  sizeOfPage: number;
  numberOfElements: number;
  numberOfPages: number;

  sortField: string;
  sortOrder: string;

  pages: number[]; // numbers of all pages [1;2...8]

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit() {
    this.getPurchases(0, 30, 'id', 'asc');
  }


  getPurchases(page, size, sortField, sortOrder): void {
    this.purchaseService.getPurchases(page, size, sortField, sortOrder)
      .subscribe(response => {
        this.purchases = response['_embedded']['purchases']
          .map(purchaseJson => {
            const purchase = purchaseJson;
            purchase.shop = purchaseJson['shop'];
            purchase.employee = purchaseJson['employee'];
            return purchase;
          });

        this.currentPage    = response['page']['number'];
        this.sizeOfPage     = response['page']['size'];
        this.numberOfElements  = response['page']['totalElements'];
        this.numberOfPages     = response['page']['totalPages'];

        this.sortField = sortField;
        this.sortOrder = sortOrder;

        this.pages = Array.from(Array(this.numberOfPages), (x, index) => index + 1);
      });
  }

  getAnotherPage(page): void {
    this.getPurchases(page, this.sizeOfPage, this.sortField, this.sortOrder);
  }

  getAnotherSortOrder(sortField): void {
    let sortOrder = 'asc';
    if (sortField === this.sortField && this.sortOrder === 'asc') {
      sortOrder = 'desc';
    }

    this.getPurchases(this.currentPage, this.sizeOfPage, sortField, sortOrder);
  }
}
