import { Component, OnInit } from '@angular/core';

import { DishService } from '../dish.service';
import { Dish } from '../dish';


@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  dishes: Dish[] = [];
  reservations!: Map<Dish, number>;
  showForm: boolean = false;

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

  getAllReservationsNumber(): number {
    return Array.from(this.reservations.values())
    .reduce((sum, current) => sum + current, 0);
  }

  addDish(dish: Dish): void {
    // name = name.trim();
    // if (!name) { 
    //   return; 
    // }
    this.dishService.addDish(dish)
    .subscribe(d => {
      this.dishes.push(d);
    })
  }

  deleteDish(dish: Dish): void {
    this.dishes = this.dishes.filter(d => d!== dish);
    this.dishService.deleteDish(dish.id)
    .subscribe();
  }

  onClickForm(): void {
    this.showForm = !this.showForm;
  }



}
