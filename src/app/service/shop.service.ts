import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Shop} from '../model/shop';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ShopService {

  constructor(private http: HttpClient) { }

  private shopsUrl = 'http://localhost:8080/shops';
  private productsInShopUrl = 'http://localhost:8080/shops/%shopId%/products';

  getShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.shopsUrl);
  }

  getShop(shopId: string): Observable<Shop> {
    return this.http.get<Shop>(this.shopsUrl + '/' + shopId);
  }

  getProductsInShop(shopId) {
    return this.http.get<Shop>(this.productsInShopUrl.replace('%shopId%', shopId));
  }

  addProductsToShopStorage(shopId: string, amountOfProductsMap): void {
    this.http.post(this.productsInShopUrl.replace('%shopId%', shopId), amountOfProductsMap, httpOptions).subscribe();
  }

}
