import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AdvancedSearchService {

  constructor(private http: HttpClient) { }

  /**
   *
   * @param table
   * @param value
   * @param searchInput
   */
  public getValuesForDropdown(table, field, searchInput): Observable<string[]> {
    return this.http
      .get<string[]>(environment.apiUrl + this.buildUrlForDropdown(table, field, searchInput));
  }

  /**
   *
   * @param table
   * @param field
   * @param searchInput
   */
  buildUrlForDropdown(table, field, searchInput) {
    const urlConfig = {
      shops: {
        state: {
        url: '/shops/search-params/state'
      },
      city: {
        url: '/shops/search-params/city',
        urlParams: [
          'state'
        ]
      }
      }
    };

    let resultUrl = urlConfig[table][field].url;
    const params = urlConfig[table][field].urlParams;
    let paramsUrl;

    if (!params || !searchInput) { return resultUrl; }

    paramsUrl = params.filter((param) => {
      if (searchInput[param]) { return searchInput[param]; }
    }).map((param) => {
      return param + '=' + searchInput[param];
    }).join('&');

    if (paramsUrl) {resultUrl += '?' + paramsUrl;}

    return resultUrl;
  }

}
