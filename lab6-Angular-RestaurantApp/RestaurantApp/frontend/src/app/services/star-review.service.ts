import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Dish } from '../models/dish.model';
import { Review } from '../models/review.model';
import { Star } from '../models/star.model';
import { DishService } from './dish.service';
import { WebRequestsService } from './web-requests.service';


export type StarMap = Map<Dish["id"], number>;

@Injectable({
  providedIn: 'root'
})
export class StarReviewService {
  private starsUrl = 'stars';
  private reviewsUrl = 'reviews'
  readonly ROOT_URL = this.webService.ROOT_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'applications/json'
    })
  }
  starMap: StarMap = new Map<Dish["id"], number>();

  constructor(
    private webService: WebRequestsService,
    private dishService: DishService,
    private http: HttpClient
  ) {  }

  getAllStars(): Observable<Star[]> { 
    return this.http.get<Star[]>(`${this.ROOT_URL}/${this.starsUrl}`)
    .pipe(
      tap(_ => this.log('fetched stars')),
      catchError(this.handleError<Star[]>('getAllStars', []))
    );
  }

  getAllReviews(): Observable<Review[]> { 
    return this.http.get<Review[]>(`${this.ROOT_URL}/${this.reviewsUrl}`)
    .pipe(
      tap(_ => this.log('fetched reviews')),
      catchError(this.handleError<Review[]>('getAllReviews', []))
    );
  }

  // Returns json-formatted value
  getDishAvgStars(id: number): Observable<any> {
    const url = `${this.starsUrl}/avgStarsByDishId/${id}`;
    return this.http.get(`${this.ROOT_URL}/${url}`)
    .pipe(
      tap(_ => this.log(`got avg stars, dish id=${id}`),
      catchError(this.handleError<any>(`getDishAvgStars id=${id}`)))
    )
  }

  // Async - it takes some time to calculate the avg,
  // updates value in the map
  async getDishAvgStarValue(id: number): Promise<number> {
    let res: number = 0;
    this.getDishAvgStars(id)
    .subscribe((avgStars) => {
      res = this.round(avgStars[0].avgStars, 2);
      this.handleStarMap(id, res);
      return res;
    }, (err) => console.log("error in getDishAvgStarValue: ", err));
    await new Promise(f => setTimeout(f, 300));
    return res;
  }


  // Gets value from the map
  getDishAvgRating(dishId: number): number {
    return (this.starMap.get(dishId) != undefined || this.starMap.get(dishId)!) ? this.starMap.get(dishId)! : 0;
  }

  getAllDishReviews(dishId: number): Observable<any> {
    const url = `${this.reviewsUrl}/dish_id/${dishId}`;
    return this.http.get<any>(`${this.ROOT_URL}/${url}`)
    .pipe(
      tap(_ => this.log('fetched allDishReviews')),
      catchError(this.handleError<any>('getAllDishReviews', []))
    );;
  }

  // Sets star to the DB
  async setStar(dishId: number, val: number): Promise<void> {
    let star: Star = {
      dishId: await this.dishService.getMongoDishIdValue(dishId),
      stars: val 
    };

    this.addStar(star)
    .subscribe();
  }

  addStar(star: Star): Observable<Star> {
    return this.http.post<Star>(`${this.ROOT_URL}/${this.starsUrl}`, star)
    .pipe(
      tap((newStar: Star) => this.log(`added star`)),
      catchError(this.handleError<Star>('addReview')));
  }

  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.ROOT_URL}/${this.reviewsUrl}`, review)
    .pipe(
      tap((newReview: Review) => this.log(`added review: ${newReview}`)),
      catchError(this.handleError<Review>('addReview'))
    );
  }

  // Returns mongo object _id dish value, given the id dish value
  async getMongoDishId(id: number): Promise<string> {
    return await this.dishService.getMongoDishIdValue(id);
  }

  handleStarMap(dishId: number, avgStarValue: number): void {
    this.starMap.set(dishId, avgStarValue);
  }

  round(value: number, precision: number): number {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
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
