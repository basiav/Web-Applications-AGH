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
  avgRating!: number;

  constructor(
    private starReviewService: StarReviewService,
    public dialog: MatDialog
  ) {
    // Wait some time before counting avg. rating
    //  for the parent-child component communication to succeed
    setTimeout(() => {
      this.updateAvgRating();
    }, 200);
  }

  ngOnInit(): void {
  }

  // Handles clicking on stars with the intent to rate the dish,
  async starHandler(value: number): Promise<void> {
    // If rating is blocked, then open dialog information
    if (this.ratingDisabled) {
      this.openDialog();
    }
    else {
      // If we're free to go with the rating, register the new star, then update avg. rating
      await this.starReviewService.setStar(this.dishId, value)
      .then(() => {
        this.updateAvgRating();
      });
    }
  }

  // Updates rating, needs to be async, it takes some time to count the avg
  async updateAvgRating() {
    await this.starReviewService.getDishAvgStarValue(this.dishId)
    setTimeout(() => {
      this.avgRating = this.starReviewService.getDishAvgRating(this.dishId);
    }, 500);
  }

  openDialog(): void {
    this.dialog.open(DialogComponent);
  }

}
