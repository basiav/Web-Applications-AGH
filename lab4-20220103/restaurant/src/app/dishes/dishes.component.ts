import { Component, OnInit } from '@angular/core';

import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';
import { CartService } from '../services/cart.service';
import { Reservations } from '../shared/reservations';


@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  dishes: Dish[] = [];
  reservations: Reservations = this.cartService.getItems();
  showForm: boolean = false;
  showSearchBox: boolean = false;

  constructor(
    private dishService: DishService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    // this.reservations = new Map<Dish, number>();
    this.getDishes();
    // this.getReservationsFromService();
  }

  getDishes(): void {
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes);
    console.log("Dishes: ", this.dishes)
    this.dishes.forEach(dish => {
      console.log("Dish: ", dish)
    })
  }

  getReservationsFromService(): void {
    this.reservations = this.cartService.getItems();
  }

  getCurrentReservedNumber(dish: Dish): number {
    return this.cartService.getCurrentItemsNumber(dish);
  }

  getCurrentlyAvailableDishAmount(dish: Dish): number {
    return this.cartService.getCurrentlyAvailableDishAmount(dish);
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

  getAllReservationsNumber(): number {
    return Array.from(this.reservations.values())
    .reduce((sum, current) => sum + current, 0);
  }

  addDish(dish: Dish): void {
    this.dishService.addDish(dish)
    .subscribe(d => {
      this.dishes.push(d);
    })
  }

  deleteDish(dish: Dish): void {
    this.dishes = this.dishes.filter(d => d!== dish);
    this.cartService.deleteFromCart(dish);
    this.dishService.deleteDish(dish.id)
    .subscribe();
  }

  onClickForm(): void {
    this.showForm = !this.showForm;
  }

  onClickSearchBox(): void {
    this.showSearchBox = !this.showSearchBox;
  }

  addNewDish(e: Dish): void {
    this.addDish(e);
  }

  getHighestPrice(): number {
    return Math.max.apply(Math, this.dishes.map(function(dish) { return dish.price; }));
  }

  getLowestPrice(): number {
    return Math.min.apply(Math, this.dishes.map(function(dish) { return dish.price; }));
  }

  getPriceColour(dish: Dish): string {
    if(dish.price === this.getHighestPrice()){
      return "green";
    }
    if (dish.price === this.getLowestPrice()) {
      return "red";
    }
    return "none";
  }

  getBorderWidth(dish: Dish): string {
    if(dish.price === this.getHighestPrice() || dish.price === this.getLowestPrice()){
      return "5px";
    }
    return "0px";
  }



}
