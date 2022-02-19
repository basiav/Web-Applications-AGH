import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {
  dish?: Dish;

  constructor(
    private route: ActivatedRoute,
    private dishService: DishService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getDish();
  }

  getDish(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dishService.getDish(id)
    .subscribe(dish => this.dish = dish);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.dish) {
      this.dishService.updateDish(this.dish)
      .subscribe(() => this.goBack());
    }
  }

}
