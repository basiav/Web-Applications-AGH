import { Component, OnInit } from '@angular/core';
import { Dish } from '../models/dish.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { CartService } from '../services/cart.service';
import { Review } from '../models/review.model';
import { PageEvent } from '@angular/material/paginator';
import { StarReviewService } from '../services/star-review.service';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {
  dish!: Dish;
  reviews!: Review[];
  nick!: string;
  name!: string;
  body!: string;
  date!: Date;
  flags: boolean[] = [];
  ratingDisabled: boolean = false;

  paginationStart: number = 0;
  paginationEnd!: number;

  constructor(
    private route: ActivatedRoute,
    private dishService: DishService,
    private cartService: CartService,
    private starsReviewService: StarReviewService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getDish();
    this.getReviews();
  }

  getDish(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dishService.getDish(id)
    .subscribe(dish => {
      this.dish = dish;
    });
  }

  getReviews(): void {
    // this.starsReviewService.getAllDishReviews(this.dish.id)
    // .subscribe(reviews => {
    //   console.log("REVIEWS: ", reviews);
    //   this.reviews = reviews;
    // })

    this.starsReviewService.getAllReviews()
    .subscribe(reviews => {
      console.log("REVIEWS: ", reviews);
      this.reviews = reviews;
    })
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.dishService.updateDish(this.dish)
    .subscribe(() => this.goBack());
  }

  getCurrentlyAvailableDishAmount(dish: Dish): number {
    return this.cartService.getCurrentlyAvailableDishAmount(dish);
  }

  getCurrentReservedNumber(dish: Dish): number {
    return this.cartService.getCurrentItemsNumber(dish);
  }

  addToReservation(dish: Dish): boolean {
    let reservationsNo = this.getCurrentReservedNumber(dish)
    if (reservationsNo < dish.maxDailyAmount){
      this.cartService.addToCart(dish);
      return true;
    } else {
      this.dishService.log("[dishes | addToReservation] Cannot make more reservations than available dishes. Reservation denied");
      return false;
    }
  }

  deleteFromReservation(dish: Dish): boolean {
    let reservationsNo = this.getCurrentReservedNumber(dish);
    if (reservationsNo > 0) {
      return this.cartService.decrementInCart(dish);
    } else {
      this.dishService.log("[dishes | deleteFromReservation] Cannot delete this dish from the reservation, it has not been reserved");
      return false;
    }
  }

  onNickNotify(event: string): void {
    this.nick = event;
  }

  onNameNotify(event: string): void {
    this.name = event;
  }

  onBodyNotify(event: string): void {
    this.body = event;
  }

  onDateNotify(event: Date): void {
    this.date = event;
  }

  async addNewReview(): Promise<void> {
    let r: Review;
    let mongoId: string = await this.starsReviewService.getMongoDishId(this.dish.id);
    if (this.date) {
      r = {
        dishId: mongoId,
        // author: this.nick,
        reviewHead: this.name,
        reviewBody: this.body,
        purchaseDate: this.date,
      }
    }
    else {
      r = {
        dishId: mongoId,
        // author: this.nick,
        reviewHead: this.name,
        reviewBody: this.body,
      }
    }

    // if(!this.reviews.includes(r)) {
    //   this.reviews.push(r);
    //   return true;
    // }
    // return false;
    setTimeout(() => {
      console.log("DISH _ID: ", r.dishId)
      this.starsReviewService.addReview(r)
      .subscribe();

      setTimeout(() => this.getReviews(), 300);
    }, 1000);
  }

  onPageChange(event: PageEvent) {
    const startIdx = event.pageIndex * event.pageSize;
    let endIdx = startIdx + event.pageSize;
    if(endIdx > this.reviews.length) {
      endIdx = this.reviews.length;
    }
    this.registerPaginationBounds([startIdx, endIdx]);
  }

  registerPaginationBounds(event: Array<number>) {
    this.paginationStart = event[0];
    this.paginationEnd = event[1];
  }

  getPaginatedReviews() {
    return this.reviews.slice(this.paginationStart, this.paginationEnd);
  }

  getCurrency(): string {
    return this.cartService.currency;
  }

}
