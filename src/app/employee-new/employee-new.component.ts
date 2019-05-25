import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmployeeService} from '../service/employee.service';
import {Shop} from '../model/shop';
import {ShopService} from '../service/shop.service';
import {Employee} from '../model/employee';

@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.css']
})
export class EmployeeNewComponent implements OnInit {
  shops: Shop[];

  constructor(private router: Router,
              private employeeService: EmployeeService,
              private shopService: ShopService
  ) { }

  ngOnInit() {
    this.getShops();
  }

  getShops(): void {
    this.shopService.getShops()
      .subscribe(shopsResponse => {
        this.shops = shopsResponse['_embedded'].shops;
      });
  }

  add(firstName: string, lastName: string, email: string, phone: string, role: string, shop: string): void {
    this.employeeService.addEmployee({firstName, lastName, email, phone, role} as Employee, shop).subscribe();
    this.router.navigate(['/employees']);
  }
}
