import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, flatMap, map, mergeMap, tap } from 'rxjs/operators';

import { Dish } from '../shared/dish';
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
    // private messageService: MessageService
    ) { }

  getDishes(): Observable<Dish[]> { 
    return this.http.get<Dish[]>(this.dishesUrl)
    .pipe(
      tap(_ => this.log('fetched dishes')),
      catchError(this.handleError<Dish[]>('getDishes', []))
    ); 
  }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  /** Log a DishService message with the MessageService */
  public log(message: string) {
    // this.messageService.add(`DishService: ${message}`);
    console.log(message);
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

  addDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.dishesUrl, dish, this.httpOptions)
    .pipe(
      tap((newDish: Dish) => this.log(`added dish id=${newDish.id}`)),
      catchError(this.handleError<Dish>('addDish')));
  }

  genId(): Observable<Number> {
    return this.http.get<Dish[]>(this.dishesUrl)
      .pipe(
        mergeMap(dishes => {
          return of(dishes.length > 0 ? Math.max(...dishes.map(dish => dish.id)) + 1 : 1);
        })
      );
    
  }
}
