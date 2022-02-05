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
  // menu!: Map<string, number>;

  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    // this.menu = new Map<string, number>();
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

}
