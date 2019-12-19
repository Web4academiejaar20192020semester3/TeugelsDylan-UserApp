import { Injectable } from '@angular/core';
import { Observable, interval, timer, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {catchError } from 'rxjs/operators';

import { Person } from './person';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private url = 'http://localhost:8080/Controller?action=GetPersons';

  constructor(private http: HttpClient) { }

  getPersons() {
    return timer(0, 10000).pipe(switchMap(() => this.http.get<Person[]>(this.url)
      .pipe(catchError(this.handleError('getPersons', [])))));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
