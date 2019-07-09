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

  private shopsUrl = environment.apiUrl + 'shops';

  private productsInShopUrl = environment.apiUrl + 'shops/%shopId%/products';


  getShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.shopsUrl);
  }

  getShopsByLiveSearch(input: string): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.shopsUrl + '?searchInput=' + input);
  }


  getShop(shopId: string): Observable<Shop> {
    return this.http.get<Shop>(this.shopsUrl + '/' + shopId);
  }

  getProductsInShop(shopId) {
    return this.http.get<Shop>(this.productsInShopUrl.replace('%shopId%', shopId));
  }

  addShop(shop: Shop): Observable<Shop> {
    return this.http.post<Shop>(this.shopsUrl, shop, httpOptions);
  }

  saveShop(shop: Shop, shopId: string): Observable<Shop> {
    return this.http.put<Shop>(this.shopsUrl + '/' + shopId, shop, httpOptions);
  }

  addProductsToShopStorage(shopId: string, amountOfProductsMap): void {
    this.http.post(this.productsInShopUrl.replace('%shopId%', shopId), amountOfProductsMap, httpOptions).subscribe();
  }

}
