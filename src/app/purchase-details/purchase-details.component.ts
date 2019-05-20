import {Component, OnInit} from '@angular/core';
import {Purchase} from '../model/purchase';
import {ActivatedRoute} from '@angular/router';
import {PurchaseService} from '../service/purchase.service';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.css']
})

export class PurchaseDetailsComponent implements OnInit {
  purchase: Purchase;
  purchasePositionsData;
  constructor(private route: ActivatedRoute,
              private purchaseService: PurchaseService) { }

  ngOnInit() {
    this.getPurchase();
    this.getPurchasePositions();
  }

  getPurchase(): void {
    const purchaseId = this.route.snapshot.paramMap.get('id');

    this.purchaseService.getPurchase(purchaseId)
      .subscribe(purchase => {
        this.purchase = purchase;
        console.log('this.purchase: ' + this.purchase);
      });
  }

  getPurchasePositions(): void {
    const purchaseId = this.route.snapshot.paramMap.get('id');

    this.purchaseService.getPurchasePositions(purchaseId)
      .subscribe(purchasePositions => {
        console.log('purchasePositions: ' + JSON.stringify(purchasePositions));
        this.purchasePositionsData = purchasePositions;
      });
  }
}
