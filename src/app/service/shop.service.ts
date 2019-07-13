import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Shop} from '../model/shop';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ShopService {

  constructor(private http: HttpClient) { }

  private shopUrl = environment.apiUrl + 'shops';

  private shopsUrl = environment.apiUrl + 'shops%advancedSearch%?page=%page%&size=%size%&sort=%field%,%order%';

  private productsInShopUrl = environment.apiUrl + 'shops/%shopId%/products';


  getShops(page, size, field, order, liveSearchInput, advancedSearchParams) {
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
    const defaultSize = 5;
    const defaultField = 'name';
    const defaultOrder = 'asc';

    page = page ? page : defaultPage;
    size = size ? size : defaultSize;
    field = field ? field : defaultField;
    order = order ? order : defaultOrder;

    return this.shopsUrl
      .replace('%page%', page)
      .replace('%size%', size)
      .replace('%field%', field)
      .replace('%order%', order);
  }



  getShop(shopId: string): Observable<Shop> {
    return this.http.get<Shop>(this.shopUrl + '/' + shopId);
  }

  addShop(shop: Shop): Observable<Shop> {
    return this.http.post<Shop>(this.shopUrl, shop, httpOptions);
  }

  saveShop(shop: Shop, shopId: string): Observable<Shop> {
    return this.http.put<Shop>(this.shopUrl + '/' + shopId, shop, httpOptions);
  }


  getProductsInShop(shopId) {
    return this.http.get<Shop>(this.productsInShopUrl.replace('%shopId%', shopId));
  }
  
  addProductsToShopStorage(shopId: string, amountOfProductsMap): void {
    this.http.post(this.productsInShopUrl.replace('%shopId%', shopId), amountOfProductsMap, httpOptions).subscribe();
  }

}
