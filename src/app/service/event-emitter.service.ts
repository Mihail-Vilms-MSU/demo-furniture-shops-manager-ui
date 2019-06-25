import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeShopComponentFunction = new EventEmitter();

  constructor() { }

  executeLiveSearch(params: object) {
    if (params['table'] === 'shops') {
      this.invokeShopComponentFunction.emit(params);
    }
  }


}
