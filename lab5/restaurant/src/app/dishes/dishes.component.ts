import { Component, OnInit } from '@angular/core';

import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';
import { CartService } from '../services/cart.service';
import { Reservations } from '../shared/reservations';
import { SearchPipe } from '../pipes/search.pipe';
import { FilterCriteria } from '../shared/filterCriteria';
import { StarService } from '../services/star.service';


@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  dishes: Dish[] = [];
  reservations: Reservations = this.cartService.getItems();

  showFilters: boolean = false;
  filterDishes: boolean = false;
  searchPipe: SearchPipe;

  constructor(
    private dishService: DishService,
    private cartService: CartService,
    private starService: StarService,
  ) {
    this.searchPipe = new SearchPipe(this.starService);
  }

  ngOnInit(): void {
    this.getDishes();
  }

  getDishes(): void {
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes);
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

  onClickFilters(): void {
    this.toggleFilters();
    if(!this.showFilters) {
      this.getDishes();
    }
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
    this.filterDishes = !this.filterDishes;
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

  delay: number = 500;

  filterCriteria(event: string[]) {
    this.filterDishes = true;
  }

  filterCuisine(event: string[]) {
    this.getDishes();
    setTimeout(() => {
      this.dishes = this.searchPipe.transform(this.dishes, 
        FilterCriteria.Cuisine, event);
    }, this.delay);
  }

  filterCategory(event: string[]) {
    this.getDishes();
    setTimeout(() => {this.dishes = this.searchPipe.transform(this.dishes, 
      FilterCriteria.DishCategory, event)}, this.delay);
  }
  
  filterPrice(event: number) {
    this.getDishes();
    setTimeout(() => {
      this.dishes = this.searchPipe.transform(this.dishes, 
        FilterCriteria.Price, [], event);
    }, this.delay);
  }

  filterReview(event: number) {
    this.dishes = this.searchPipe.transform(this.dishes, 
      FilterCriteria.Review, [], event);
  }

  filterName(event: string) {
    this.getDishes();
    let args: string[] = [];
    args.push(event);
    setTimeout(() => {
      this.dishes = this.searchPipe.transform(this.dishes, 
        FilterCriteria.Name, args);
    }, this.delay);
  }

  resetDishes(): void {
    this.getDishes();
  }

}
