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
    this.updateAvgRating();
  }

  ngOnInit(): void {
  }

  async starHandler(value: number): Promise<void> {
    if (this.ratingDisabled) {
      this.openDialog();
    }
    else {
      await this.starReviewService.setStar(this.dishId, value)
      .then(() => {
        console.log("Updating avg rating | BEFORE: ", this.avgRating);
        this.updateAvgRating();
      });
    }
  }

  async updateAvgRating() {
    await this.starReviewService.getDishAvgStarValue(this.dishId);
    this.avgRating = this.starReviewService.getDishAvg(this.dishId);
  }

  openDialog(): void {
    this.dialog.open(DialogComponent);
  }

}
