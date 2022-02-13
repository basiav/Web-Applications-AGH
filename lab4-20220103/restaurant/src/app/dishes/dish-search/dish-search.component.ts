import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { Dish } from '../../shared/dish';

@Component({
  selector: 'app-dish-search',
  templateUrl: './dish-search.component.html',
  styleUrls: ['./dish-search.component.css']
})
export class DishSearchComponent implements OnInit {
  dishes$!: Observable<Dish[]>;
  private searchTerms = new Subject<string>();

  constructor(private searchService: SearchService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.dishes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.searchService.searchDishes(term)),
    );
  }

}
