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
    private starReviewService: StarReviewService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  starHandler(value: number): void {
    if (this.ratingDisabled) {
      this.openDialog();
    }
    else {
      this.starReviewService.setStar(this.dishId, value);
    }
  }

  avgRating(): number {
    // return this.starReviewService.getDishAvgStarValue(this.dishId);
    return 1;
  }

  openDialog(): void {
    this.dialog.open(DialogComponent);
  }

}
