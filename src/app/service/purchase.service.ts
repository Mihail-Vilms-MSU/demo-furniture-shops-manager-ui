import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Purchase} from '../model/purchase';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class PurchaseService {

  constructor(private http: HttpClient) { }

  private purchaseUrl = environment.apiUrl + 'purchases';

  private purchasesUrl = environment.apiUrl + 'purchases?page=%page%&size=%size%';

  private newPurchaseUrl = environment.apiUrl + 'purchases?shopId=%shopId%&employeeId=%employeeId%';

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

  getPurchase(purchaseId: string): Observable<Purchase> {
    return this.http.get<Purchase>(this.purchaseUrl + '/' + purchaseId);
  }

  getPurchasePositions(purchaseId: string) {
    return this.http.get(this.purchaseUrl + '/' + purchaseId + '/' + 'products');
  }

  addPurchase(shopId: string, employeeId: string, productsMap) {
    const targetUrl = this.newPurchaseUrl
      .replace('%shopId%', shopId)
      .replace('%employeeId%', employeeId);

    return this.http.post(targetUrl, productsMap).subscribe();
  }

}
