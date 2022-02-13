import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Dish } from '../shared/dish';
import { DishService } from './dish.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private dishesUrl = 'api/dishes';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'applications/json'
    })
  }

  constructor(
    private http: HttpClient,
    private dishService: DishService
  ) { }

  log(message: string): void {
    return this.dishService.log(message);
  }

  handleError<T>(operation = 'operation', result?: T) {
    return this.dishService.handleError(operation, result);
  }

  searchDishes(term: string): Observable<Dish[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Dish[]>(`${this.dishesUrl}/?name=${term}`)
    .pipe(
      catchError(this.handleError<Dish[]>('searchDishes', []))
    );
  }

  getAllCuisines(dishes: Dish[]): String[] {
    let res: String[] = [];
    dishes.forEach(dish => {
      dish.cuisine.forEach(cuisine => {
        if(!res.includes(cuisine)) {
          res.push(cuisine);
        }
      });
    });
    return res;
  }

  getAllDishCategories(dishes: Dish[]): String[] {
    let res: String[] = [];
    dishes.forEach(dish => {
      dish.category.forEach(cat => {
        if(!res.includes(cat)) {
          res.push(cat);
        }
      });
    });
    return res;
  }


  
}
