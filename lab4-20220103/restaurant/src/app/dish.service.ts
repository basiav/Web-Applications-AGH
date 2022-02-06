import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Dish } from './dish';
import { MessageService } from './message.service';

@Injectable({
  // Declares that this service should be created
  // by the root application injector.
  providedIn: 'root'
})
export class DishService {
  private dishesUrl = 'api/dishes';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'applications/json'
    })
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

  getDishes(): Observable<Dish[]> { 
    return this.http.get<Dish[]>(this.dishesUrl)
    .pipe(
      tap(_ => this.log('fetched dishes')),
      catchError(this.handleError<Dish[]>('getDishes', []))
    ); 
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  /** Log a DishService message with the MessageService */
  public log(message: string) {
    this.messageService.add(`DishService: ${message}`);
  }

  getDish(id: number): Observable<Dish> {
    const url =  `${this.dishesUrl}/${id}`;
    return this.http.get<Dish>(url)
    .pipe(
      tap(_ => this.log(`fetched dish id=${id}`),
      catchError(this.handleError<Dish>(`getDish id=${id}`)))
    );
  }

  deleteDish(id: number): Observable<Dish> {
    const url = `${this.dishesUrl}/${id}`;
    return this.http.delete<Dish>(url, this.httpOptions)
    .pipe(
      tap(_ => this.log(`deleted dish id=${id}`)),
      catchError(this.handleError<Dish>('deleteDish'))
    );
  }
}
