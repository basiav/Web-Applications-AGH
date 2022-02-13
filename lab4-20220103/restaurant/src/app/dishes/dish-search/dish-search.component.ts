import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';

import { SearchService } from '../../services/search.service';
import { Dish } from '../../shared/dish';

@Component({
  selector: 'app-dish-search',
  templateUrl: './dish-search.component.html',
  styleUrls: ['./dish-search.component.css']
})
export class DishSearchComponent implements OnInit {
  dishesObs$!: Observable<Dish[]>;
  @Input()
  dishes!: Dish[];
  private searchTerms = new Subject<string>();
  
  searchCategories = new FormControl();
  searchCategoriesList: String[];

  cuisine = new FormControl();
  cuisineList: String[];

  dishCategories = new FormControl();
  dishCategoryList: String[];

  @Output() criteriaNotify = new EventEmitter();
  @Output() cuisineNotify = new EventEmitter();
  @Output() priceNotify = new EventEmitter();
  @Output() reviewNotify = new EventEmitter();
  @Output() categoryNotify = new EventEmitter();

  constructor(private searchService: SearchService) { 
    this.searchCategoriesList = ["typ kuchni", "cena", "ocena", "kategoria dania", "nazwa dania"];
    this.cuisineList = ['grecka', 'międzynarodowa', 'polska', 'tradycyjna', 'francuska', 'indyjska', 'włoska', 'wegańska', 'amerykańska', 'angielska'];
    this.dishCategoryList = ["mięsne", "kolacje", "wegetariańskie", "na słono", "na słodko", "deser"];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.cuisineList = this.searchService.getAllCuisines(this.dishes);
      this.dishCategoryList = this.searchService.getAllDishCategories(this.dishes);
    }, 1000);

    this.dishesObs$ = this.searchTerms.pipe(
      // wait 200ms after each keystroke before considering the term
      debounceTime(200),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.searchService.searchDishes(term)),
    );
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }  

  search(term: string): void {
    this.searchTerms.next(term);
  }

  onCriteriaChange(e: any) {
    this.criteriaNotify.emit(this.searchCategories.value);
  }

  onCuisineChange(e: any) {
    this.cuisineNotify.emit(this.cuisine.value);
  }

  onDishCategoryChange(e: any) {
    this.categoryNotify.emit(this.dishCategories.value);
  }

  onPriceChange(e: any) {
    // this.priceNotify.emit(this.)
  }

  onReviewChange(e: any) {
  }


}
