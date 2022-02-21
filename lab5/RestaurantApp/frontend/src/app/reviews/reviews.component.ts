import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { StarReviewService } from '../services/star-review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  @Input()
  dishId!: number;
  @Input()
  ratingDisabled!: boolean;

  constructor(
    private starService: StarReviewService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  starHandler(value: number): void {
    if (this.ratingDisabled) {
      this.openDialog();
    }
    else {
      this.starService.setStar(this.dishId, value);
    }
  }

  avgRating(): number {
    return this.starService.getDishAvgStars(this.dishId);
  }

  openDialog(): void {
    this.dialog.open(DialogComponent);
  }

}
