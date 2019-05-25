import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ShopService} from './shop.service';
import {Employee} from '../model/employee';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private http: HttpClient, private shopService: ShopService) { }

  private employeeUrl = 'http://localhost:8080/employees';

  private employeesUrl = 'http://localhost:8080/employees?page=%page%&size=%size%&sort=%field%,%order%';

  getEmployees(page, size, field, order) {
    return this.http.get(this.composeUrl(page, size, field, order));
  }

  /**
   *
   * @param page
   * @param size
   * @param field
   * @param order
   */
  composeUrl(page, size, field, order): string {
    const defaultPage = 0;
    const defaultSize = 15;
    const defaultField = 'lastName';
    const defaultOrder = 'asc';

    page = page ? page : defaultPage;
    size = size ? size : defaultSize;
    field = field ? field : defaultField;
    order = order ? order : defaultOrder;

    return this.employeesUrl
      .replace('%page%', page)
      .replace('%size%', size)
      .replace('%field%', field)
      .replace('%order%', order);
  }

  addEmployee(employee: Employee, shopId: string): Observable<Employee> {
    console.log(this.employeeUrl + '?shopId=' + shopId);
    return this.http.post<Employee>(this.employeeUrl + '?shopId=' + shopId, employee, httpOptions);
  }
}
