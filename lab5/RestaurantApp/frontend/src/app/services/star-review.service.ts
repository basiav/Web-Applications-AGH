import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Dish } from '../models/dish.model';
import { Review } from '../models/review.model';
import { Star } from '../models/star.model';
import { DishService } from './dish.service';
import { WebRequestsService } from './web-requests.service';


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
    return this.http.get<Review[]>(`${this.ROOT_URL}/${this.starsUrl}`)
    .pipe(
      tap(_ => this.log('fetched reviews')),
      catchError(this.handleError<Review[]>('getAllReviews', []))
    );
  }

  getDishAvgStars(id: number): Observable<number> {
    const url = `${this.starsUrl}/avgStarsByDishId/${id}`;
    return this.http.get<number>(`${this.ROOT_URL}/${url}`)
    .pipe(
      tap(_ => this.log(`got avg stars, dish id=${id}`),
      catchError(this.handleError<number>(`getDishAvgStars id=${id}`)))
    )
  }

  async getDishAvgStarValue(id: number): Promise<number> {
    let res = 0;
    this.getDishAvgStars(id)
    .subscribe((avgStars) => {
        res = this.round(avgStars.valueOf(), 2);
    }, (err) => console.log("error in getDishAvgStarValue: ", err));
    await new Promise(f => setTimeout(f, 1000));
    return res.valueOf();
  }

  getAllDishReviews(dish)

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
      tap((newReview: Review) => this.log(`added review`)),
      catchError(this.handleError<Review>('addReview')));
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
