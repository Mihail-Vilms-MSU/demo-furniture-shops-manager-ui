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

  private productUrl = environment.apiUrl + 'products';

  private productsUrl = environment.apiUrl + 'products%advancedSearch%?page=%page%&size=%size%&sort=%field%,%order%';


  getProducts(page, size, field, order, liveSearchInput, advancedSearchParams) {
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
    const defaultSize = 10;
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
