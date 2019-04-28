import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];
  employee2: Employee;
  employee1: Employee = {
    id: 100000,
    firstName: 'awefawef',
    lastName: 'wefawfawf',
    phone: 'asdfasdfasdf',
    email: 'asdfasdfasdf',
    shopId: 123,
    role: 'waefawef'
  };

  // constructor(private employeeService: EmployeeService) { }
  constructor(private employeeService: EmployeeService) {
    console.log(' ~~~~ ~~~~ in 1 constructor employees.component.ts');

  }

  ngOnInit(){
    this.getEmployees();
  }

  getEmployees(): void {
    console.log('in heroes.component.ts getEmployees: ');
    this.employeeService.getEmployees()
      .subscribe(employeesResponse => {
        console.log('~~~~~ in heroes.component.ts getEmployees heroes: ', employeesResponse);
        console.log('~~~~~ in heroes.component.ts getEmployees heroes: ', employeesResponse['_embedded']['employees']);
        this.employees = employeesResponse['_embedded']['employees'];
        console.log('~~~~~ ~~~~~~ this.employees:', this.employees);
        this.employee2 = this.employees[0];
        console.log('~~~~~ ~~~~~~ this.employee2:', this.employee2);
      });
  }

}
