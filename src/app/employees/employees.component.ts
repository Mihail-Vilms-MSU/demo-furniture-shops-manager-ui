import {Component, OnInit} from '@angular/core';
import {Employee} from '../model/employee';
import {EmployeeService} from '../service/employee.service';
import {ShopService} from '../service/shop.service';
import {EventEmitterService} from "../service/event-emitter.service";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];

  currentPage: number;
  sizeOfPage: number;
  numberOfElements: number;
  numberOfPages: number;

  sortField: string;
  sortOrder: string;

  pages: number[];

  inputSearch: string;
  searchParams;

  constructor(
    private employeeService: EmployeeService,
    private shopService: ShopService,
    private eventEmitterService: EventEmitterService
  ) { }


  ngOnInit() {
    this.getEmployees(0, 20, 'lastName', 'asc', null, null);

    this.eventEmitterService.invokeLiveSearchOnEmployees.subscribe((searchInput) => {
      this.getEmployees(0, this.sizeOfPage, this.sortField, this.sortOrder, searchInput, null);
    });

    this.eventEmitterService.invokeAdvancedSearchOnEmployees.subscribe((searchParams) => {
      this.getEmployees(0, this.sizeOfPage, this.sortField, this.sortOrder, null, searchParams);
    });
  }


  getEmployees(page, size, sortField, sortOrder, searchInput, searchParams): void {
    this.employeeService.getEmployees(page, size, sortField, sortOrder, searchInput, searchParams)
      .subscribe(response => {
        this.employees = response['_embedded']['employees'] || [];

        this.currentPage    = response['page']['number'];
        this.sizeOfPage     = response['page']['size'];
        this.numberOfElements  = response['page']['totalElements'];
        this.numberOfPages     = response['page']['totalPages'];

        this.sortField = sortField;
        this.sortOrder = sortOrder;

        this.pages = Array.from(Array(this.numberOfPages), (x, index) => index + 1);

        this.inputSearch = searchInput;
        this.searchParams = searchParams;
      });
  }

  getAnotherPage(page): void {
    this.getEmployees(page, this.sizeOfPage, this.sortField, this.sortOrder, this.inputSearch, this.searchParams);
  }

  getAnotherSortOrder(sortField): void {
    let sortOrder = 'asc';
    if (sortField === this.sortField && this.sortOrder === 'asc') {
      sortOrder = 'desc';
    }

    this.getEmployees(this.currentPage, this.sizeOfPage, sortField, sortOrder, this.inputSearch, this.searchParams);
  }
}
