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

  getShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.shopsUrl);
  }

  getShop(shopUrl): Observable<Shop> {
    return this.http.get<Shop>(shopUrl);
  }
}
