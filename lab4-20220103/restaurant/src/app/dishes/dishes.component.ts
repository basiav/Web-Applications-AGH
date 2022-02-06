import { Component, OnInit } from '@angular/core';

import { DishService } from '../dish.service';
import { Dish } from '../dish';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  dishes: Dish[] = [];
  reservations!: Map<Dish, number>;

  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    this.reservations = new Map<Dish, number>();
    this.getDishes();
  }

  getDishes(): void {
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes);
    console.log("Dishes: ", this.dishes)
    this.dishes.forEach(dish => {
      console.log("Dish: ", dish)
    })
  }

  getCurrentReservedNumber(dish: Dish): number {
    let reservationsNo = this.reservations.get(dish);
    if (reservationsNo && reservationsNo > 0) {
      return reservationsNo;
    } else {
      return 0;
    }
  }

  getCurrentlyAvailableDishAmount(dish: Dish): number {
    return dish.maxDailyAmount - this.getCurrentReservedNumber(dish);
  }

  addToReservation(dish: Dish): boolean {
    let reservationsNo = this.getCurrentReservedNumber(dish)
    if (reservationsNo < dish.maxDailyAmount){
      this.reservations.set(dish, reservationsNo + 1);
      return true;
    } else {
      this.dishService.log("[dishes | addToReservation] Cannot make more reservations than available dishes. Reservation denied");
      return false;
    }
  }

  deleteFromReservation(dish: Dish): boolean {
    let reservationsNo = this.getCurrentReservedNumber(dish);
    if (reservationsNo > 0) {
      this.reservations.set(dish, reservationsNo - 1);
      return true;
    } else {
      this.dishService.log("[dishes | deleteFromReservation] Cannot delete this dish from the reservation, it has not been reserved");
      return false;
    }
  }



}
