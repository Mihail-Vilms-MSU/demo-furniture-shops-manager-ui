import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmployeeService} from '../service/employee.service';
import {ShopService} from '../service/shop.service';
import {Shop} from '../model/shop';
import {Employee} from '../model/employee';
import {PurchaseService} from '../service/purchase.service';
import {Purchase} from '../model/purchase';

@Component({
  selector: 'app-purchase-new',
  templateUrl: './purchase-new.component.html',
  styleUrls: ['./purchase-new.component.css']
})
export class PurchaseNewComponent implements OnInit {
  shops: Shop[];
  employees: Employee[];
  productsList = [];

  chosenShopId: string;
  chosenEmployeeId: string;
  productsMap = {};

  constructor(private router: Router,
              private employeeService: EmployeeService,
              private shopService: ShopService,
              private purchaseService: PurchaseService) {}

  ngOnInit() {
    this.getShops();
    this.employees = [];
  }

  getShops(): void {
    this.shopService.getShops()
      .subscribe(shopsResponse => {
        this.shops = shopsResponse['_embedded'].shops;
    });
  }

  getProductsForShop(targetShopId) {
    this.shopService.getProductsInShop(targetShopId).subscribe(response => {
      this.productsList = response['_embedded']['amounts'];
    });
  }

  getEmployees(targetShopId): void {
    this.employees = [];
    this.employeeService.getEmployeesByShop(targetShopId).subscribe(employeesResponse => {
      for (const empIndex in employeesResponse) {
        this.employees.push(employeesResponse[empIndex]);
      }
    });
  }

  changeShop(targetShopId) {
    this.getEmployees(targetShopId);
    this.getProductsForShop(targetShopId);
  }

  composePurchase(): void {
    this.purchaseService.addPurchase(this.chosenShopId, this.chosenEmployeeId, this.productsMap);
  }
}
