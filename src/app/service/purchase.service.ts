import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Purchase} from '../model/purchase';
import {Employee} from '../model/employee';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class PurchaseService {

  constructor(private http: HttpClient) { }

  private purchasesUrl = 'http://localhost:8080/purchases?page=%page%&size=%size%';

  getPurchases(page, size, field, order) {
    return this.http.get(this.composeUrl(page, size, field));
  }

  /**
   *
   * @param page
   * @param size
   * @param field
   * @param order
   */
  composeUrl(page, size, field): string {
    const defaultPage = 0;
    const defaultSize = 100;
    const defaultField = 'purchaseId';
    const defaultOrder = 'asc';

    page = page ? page : defaultPage;
    size = size ? size : defaultSize;
    field = field ? field : defaultField;
    // order = order ? order : defaultOrder;

    return this.purchasesUrl
      .replace('%page%', page)
      .replace('%size%', size)
      .replace('%field%', field);
      // .replace('%order%', order);
  }
}
