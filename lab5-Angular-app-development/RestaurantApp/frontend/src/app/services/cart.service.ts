import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from '../models/dish.model'
import { Reservations } from '../models/reservations';
import { DishService } from './dish.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items!: Reservations;
  currency: string = 'USD';

  constructor(
    private http: HttpClient,
    private dishService: DishService
  ) { 
    this.items = new Map<Dish["id"], number>();
  }

  getCurrentItemsNumber(dish: Dish): number {
    let itemsNo = this.items.get(dish.id);
    if (this.items.has(dish.id) && itemsNo) {
      return itemsNo;
    } else {
      return 0;
    }
  }

  getCartItems(): Map<Dish, number> {
    let items: Map<Dish, number> = new Map<Dish, number>();
    this.dishService.getDishes().subscribe(
      dishes => {
        dishes.forEach(dish => {
          let quantity = this.items.get(dish.id);
          if(this.items.has(dish.id) && quantity) {
            items.set(dish, quantity);
          }
        })
      }
    );
    return items;
  }

  getCurrentlyAvailableDishAmount(dish: Dish): number {
    return dish.maxDailyAmount - this.getCurrentItemsNumber(dish);
  }

  addToCart(dish: Dish): void {
    let itemsNo = this.getCurrentItemsNumber(dish);
    this.items.set(dish.id, itemsNo + 1);
  }

  decrementInCart(dish: Dish): boolean {
    let itemsNo = this.getCurrentItemsNumber(dish);
    if (itemsNo > 0) {
      this.items.set(dish.id, itemsNo - 1);
      return true;
    } else {
      this.dishService.log("[cart | deleteFromCart] Cannot delete this dish from the shopping cart, it hasn't been here");
      return false;
    }
  }

  deleteFromCart(dish: Dish): boolean {
    return this.items.delete(dish.id);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = new Map<Dish["id"], number>();
    return this.items;
  }

  setCurrency(currency: string): void {
    this.currency = currency;
  }
}
