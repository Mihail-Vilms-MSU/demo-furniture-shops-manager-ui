import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) { }

  // ////////////////////////// paginated collection >>>>>>>>>>>>>>>>

  private productUrl = 'http://localhost:8080/products';
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
