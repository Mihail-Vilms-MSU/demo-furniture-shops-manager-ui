import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeLiveSearchOnProducts = new EventEmitter();
  invokeLiveSearchOnShops = new EventEmitter();
  invokeLiveSearchOnEmployees = new EventEmitter();
  invokeLiveSearchOnPurchases = new EventEmitter();

  invokeAdvancedSearchOnProducts = new EventEmitter();
  invokeAdvancedSearchOnShops = new EventEmitter();
  invokeAdvancedSearchOnEmployees = new EventEmitter();
  invokeAdvancedSearchOnPurchases = new EventEmitter();


  constructor() { }

  executeLiveSearch(table: string, searchInput: string) {
    if (table === 'products') {
      this.invokeLiveSearchOnProducts.emit(searchInput);
    }
    if (table === 'shops') {
      this.invokeLiveSearchOnShops.emit(searchInput);
    }
    if (table === 'employees') {
      this.invokeLiveSearchOnEmployees.emit(searchInput);
    }
    if (table === 'purchases') {
      this.invokeLiveSearchOnPurchases.emit(searchInput);
    }
  }

  executeAdvancedSearch(table: string, searchParams) {
    if (table === 'products') {
      this.invokeAdvancedSearchOnProducts.emit(searchParams);
    }
    if (table === 'shops') {
      this.invokeAdvancedSearchOnShops.emit(searchParams);
    }
    if (table === 'employees') {
      this.invokeAdvancedSearchOnEmployees.emit(searchParams);
    }
    if (table === 'purchases') {
      this.invokeAdvancedSearchOnPurchases.emit(searchParams);
    }
  }

}
