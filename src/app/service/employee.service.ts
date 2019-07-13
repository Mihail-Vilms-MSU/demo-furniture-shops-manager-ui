import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ShopService} from './shop.service';
import {Employee} from '../model/employee';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private http: HttpClient, private shopService: ShopService) { }

  private employeeUrl = environment.apiUrl + 'employees';

  private employeesUrl = environment.apiUrl + 'employees%advancedSearch%?page=%page%&size=%size%&sort=%field%,%order%';

  private employeesByShopUrl = environment.apiUrl + 'shops/%shopId%/employees';

  getEmployees(page, size, field, order, liveSearchInput, advancedSearchParams) {
    let url = this.composeUrl(page, size, field, order);

    if (advancedSearchParams) {
      url = url.replace('%advancedSearch%', '/advancedSearch');
      for (const paramKey in advancedSearchParams) {
        url += '&' + paramKey + '=' + advancedSearchParams[paramKey];
      }
    }
    url = url.replace('%advancedSearch%', '');

    if (liveSearchInput) {
      url += '&searchInput=' + liveSearchInput;
    }

    console.log('url: ' + url);
    return this.http.get(url);
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


  getEmployeesByShop(shopId: string) {
    return this.http.get(this.employeesByShopUrl.replace('%shopId%', shopId));
  }


  getEmployee(employeeId: string): Observable<Employee> {
    return this.http.get<Employee>(this.employeeUrl + '/' + employeeId);
  }

  addEmployee(employee: Employee, shopId: string): Observable<Employee> {
    return this.http.post<Employee>(this.employeeUrl + '?shopId=' + shopId, employee, httpOptions);
  }

  saveEmployee(employee: Employee, employeeId: string, shopId: string): Observable<Employee> {
    let targetUrl = this.employeeUrl + '/' + employeeId;

    if (shopId) {
      targetUrl += '?shopId=' + shopId;
    }

    return this.http.put<Employee>(targetUrl, employee, httpOptions);
  }
}
