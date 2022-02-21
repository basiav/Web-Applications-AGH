import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, flatMap, map, mergeMap, tap } from 'rxjs/operators';

import { Dish } from '../shared/dish';
import { WebRequestsService } from './web-requests.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private dishesUrl = 'dishes';
  readonly ROOT_URL = this.webService.ROOT_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'applications/json'
    })
  }

  constructor(
    private webService: WebRequestsService,
    private http: HttpClient
  ) { }


  getDishes(): Observable<Dish[]> { 
    return this.http.get<Dish[]>(`${this.ROOT_URL}/${this.dishesUrl}`)
    .pipe(
      tap(_ => this.log('fetched dishes')),
      catchError(this.handleError<Dish[]>('getDishes', []))
    );
  }

  getDish(id: number): Observable<Dish> {
    const url = `${this.dishesUrl}/${id}`;
    return this.http.get<Dish>(`${this.ROOT_URL}/${url}`)
    .pipe(
      tap(_ => this.log(`fetched dish id=${id}`),
      catchError(this.handleError<Dish>(`getDish id=${id}`)))
    );
  }

  deleteDish(id: number): Observable<Dish> {
    const url = `${this.dishesUrl}/${id}`;
    return this.http.delete<Dish>(`${this.ROOT_URL}/${url}`)
    .pipe(
      tap(_ => this.log(`deleted dish id=${id}`)),
      catchError(this.handleError<Dish>('deleteDish'))
    );
  }

  addDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(`${this.ROOT_URL}/${this.dishesUrl}`, dish)
    .pipe(
      tap((newDish: any) => this.log(`added dish id=${newDish.id}`)),
      catchError(this.handleError<Dish>('addDish')));
  }

  genId(): Observable<Number> {
    return this.getDishes()
      .pipe(
        mergeMap(dishes => {
          return of(dishes.length > 0 ? Math.max(...dishes.map(dish => dish.id)) + 1 : 1);
        })
      );
  }

  updateDish(dish: Dish): Observable<Dish> {
    return this.http.patch<Dish>(`${this.ROOT_URL}/${this.dishesUrl}`, dish)
    .pipe(
      tap(_ => this.log(`updated dish id=${dish.id}`)),
      catchError(this.handleError<any>(`updateDish`))
    );
  }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  public log(message: string) {
    console.log(message);
  }

}
