import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from './dish';
import { DishService } from './dish.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items!: Map<Dish, number>;

  constructor(
    private http: HttpClient,
    private dishService: DishService
  ) { 
    this.items = new Map<Dish, number>();
  }

  getCurrentItemsNumber(dish: Dish): number {
    let itemsNo = this.items.get(dish);
    if (itemsNo && itemsNo > 0) {
      return itemsNo;
    } else {
      return 0;
    }
  }

  addToCart(dish: Dish): void {
    let itemsNo = this.getCurrentItemsNumber(dish);
    this.items.set(dish, itemsNo + 1);
  }

  deleteFromCart(dish: Dish): boolean {
    let itemsNo = this.getCurrentItemsNumber(dish);
    if (itemsNo > 0) {
      this.items.set(dish, itemsNo - 1);
      return true;
    } else {
      this.dishService.log("[cart | deleteFromCart] Cannot delete this dish from the shopping cart, it hasn't been here");
      return false;
    }
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = new Map<Dish, number>();
    return this.items;
  }
}
