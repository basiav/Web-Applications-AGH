import { Component, Input, OnInit } from '@angular/core';
import { StarService } from '../services/star.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  @Input()
  dishId!: number;

  constructor(private starService: StarService) { }

  ngOnInit(): void {
  }

  starHandler(value: number): void {
    console.log("starHandler for: ", this.dishId);
    this.starService.setStar(this.dishId, value);
  }

  avgRating(): number {
    return this.starService.getDishAvgStars(this.dishId);
  }

}
