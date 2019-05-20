import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';
import {forEach} from '@angular/router/src/utils/collection';
import {Shop} from '../model/shop';
import {ShopService} from '../service/shop.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];

  // pagination settings
  currentPage: number;
  sizeOfPage: number;
  totalElements: number;
  totalPages: number;

  sortField: string;
  orderField: string;

  pages: number[]; // numbers of all pages [1;2...8]

  constructor(private employeeService: EmployeeService, private shopService: ShopService) { }

  ngOnInit() {
    this.getEmployees(0);
  }

  getEmployees(page): void {
    this.employeeService.getEmployees(page, null, null, null)
      .subscribe(response => {
        this.employees = response['_embedded']['employees']
          .map(employeeJson => {
            const employee = employeeJson;
            employee.shop = employeeJson['shop'];
            return employee;
          });

        this.currentPage     = response['page']['number'];
        this.sizeOfPage     = response['page']['size'];
        this.totalElements  = response['page']['totalElements'];
        this.totalPages     = response['page']['totalPages'];

        this.pages = Array.from(Array(this.totalPages), (x, index) => index + 1);
      });
  }

}
