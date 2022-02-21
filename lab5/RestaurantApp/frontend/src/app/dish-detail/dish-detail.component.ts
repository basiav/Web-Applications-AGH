import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { CartService } from '../services/cart.service';
import { Review } from '../shared/review';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {
  dish!: Dish;
  reviews: Review[] = [];
  nick!: string;
  name!: string;
  body: string[] = [];
  date!: Date;
  flags: boolean[] = [];
  ratingDisabled: boolean = false;

  paginationStart: number = 0;
  paginationEnd!: number;

  constructor(
    private route: ActivatedRoute,
    private dishService: DishService,
    private cartService: CartService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getDish();
  }

  getDish(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dishService.getDish(id)
    .subscribe(dish => {
      this.dish = dish;
    });
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

  onBodyNotify(event: string[]): void {
    this.body = event;
  }

  onDateNotify(event: Date): void {
    this.date = event;
  }

  addNewReview(): boolean {
    let r: Review;
    if (this.date) {
      r = {
        dishId: this.dish.id,
        nick: this.nick,
        name: this.name,
        body: this.body,
        date: this.date,
      }
    }
    else {
      r = {
        dishId: this.dish.id,
        nick: this.nick,
        name: this.name,
        body: this.body,
      }
    }

    if(!this.reviews.includes(r)) {
      this.reviews.push(r);
      return true;
    }
    return false;
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
