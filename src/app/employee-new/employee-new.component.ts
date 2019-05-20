import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmployeeService} from '../service/employee.service';
import {Product} from '../model/product';

@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.css']
})
export class EmployeeNewComponent implements OnInit {
  newEmployee;

  constructor(private router: Router,
              private employeeService: EmployeeService
  ) { }

  ngOnInit() {
  }

  // add(name: string, type: string, price: number, description: string): void {
  //   this.productService.addProduct({ name, type, price, description } as Product).subscribe();
  //   this.router.navigate(['/products']);
  // }

  add(): void {

  }

}
