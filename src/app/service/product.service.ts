import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private http: HttpClient) { }

  // ////////////////////////// paginated collection >>>>>>>>>>>>>>>>

  private productsUrl = 'http://localhost:8080/products?page=%page%&size=%size%&sort=%field%,%order%';

  getProducts(page, size, field, order) {
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
    const defaultSize = 30;
    const defaultField = 'name';
    const defaultOrder = 'asc';

    page = page ? page : defaultPage;
    size = size ? size : defaultSize;
    field = field ? field : defaultField;
    order = order ? order : defaultOrder;

    return this.productsUrl
      .replace('%page%', page)
      .replace('%size%', size)
      .replace('%field%', field)
      .replace('%order%', order);
  }

  // // ////////////////////////// paginated collection <<<<<<<<<<<<<<
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.productsUrl + '/' + id);
  }

  addProduct(product: Product): Observable<Product> {
    console.log(' *** add product record: ' + JSON.stringify(product));
    return this.http.post<Product>(this.productsUrl, product, httpOptions);
  }

}
