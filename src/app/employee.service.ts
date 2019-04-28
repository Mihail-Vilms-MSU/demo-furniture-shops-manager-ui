import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Employee } from './employee';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(
    private http: HttpClient
  ) { }

  private employeesUrl = 'http://localhost:8080/employees';  // URL to web api

  /** GET heroes from the Employee */
  getEmployees(): Observable<Employee[]> {
    console.log('in heroes.service.ts getEmployees: ');
    console.log('in heroes.service.ts getEmployees2322: ', this.http.get<Employee[]>(this.employeesUrl));

    return this.http.get<Employee[]>(this.employeesUrl);
  }

}
