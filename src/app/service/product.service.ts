import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) { }

  // ////////////////////////// paginated collection >>>>>>>>>>>>>>>>

  private productUrl = environment.apiUrl + 'products';

  private productsUrl = environment.apiUrl + 'products?page=%page%&size=%size%&sort=%field%,%order%';

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

  // //////////////////////////// paginated collection <<<<<<<<<<<<<<

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(this.productUrl + '/' + productId);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, httpOptions);
  }

  saveProduct(product: Product, productId: string): Observable<Product> {
    return this.http.put<Product>(this.productUrl + '/' + productId, product, httpOptions);
  }
}
