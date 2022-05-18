import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Car } from '../car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private heroesUrl = 'api/cars';  // URL to web api

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> { 
    return this.http.get<Car[]>(this.heroesUrl)
    .pipe(
      tap(_ => console.log('fetched cars')),
      catchError(this.handleError<Car[]>('getCars', []))
    ); 
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
