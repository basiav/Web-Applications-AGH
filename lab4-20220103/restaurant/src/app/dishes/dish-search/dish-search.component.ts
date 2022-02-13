import { Component, OnInit } from '@angular/core';
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
  dishes$!: Observable<Dish[]>;
  private searchTerms = new Subject<string>();
  
  searchCategories: String[];
  selectedCategory?: string;
  
  cuisine = new FormControl();
  cuisineList: String[];


  constructor(private searchService: SearchService) { 
    this.searchCategories = ["typ kuchni", "cena", "ocena", "kategoria dania"];
    this.cuisineList = ['grecka', 'międzynarodowa', 'polska', 'tradycyjna', 'francuska', 'indyjska', 'włoska', 'wegańska', 'amerykańska', 'angielska'];
  }
  

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.dishes$ = this.searchTerms.pipe(
      // wait 200ms after each keystroke before considering the term
      debounceTime(200),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.searchService.searchDishes(term)),
    );
  }

  // carsAvailable: Car[] = []; 
  // selectedBrand?: string;
  // selectedModel?: string;
  // selectedColour?: Colour;

  // constructor(private carService: CarService) { }

  // ngOnInit(): void {
  //   this.getCars();
  // }

  // getCars(): void {
  //   this.carService.getCars()
  //   .subscribe(cars => this.carsAvailable = cars);
  // }

  // getDistinctBrands(): string[] {
  //   return this.carsAvailable.map(car => car.brand)
  //   .filter((value, index, self) => self.indexOf(value) === index)
  // }

  // getDistinctModels(): string[] {
  //   console.log("Selected brand: ", this.selectedBrand);
  //   console.log(this.carsAvailable
  //     .filter(car => car.brand === this.selectedBrand)
  //     .map(car => car.model)
  //     .filter((value, index, self) => self.indexOf(value) === index))

  //   return this.carsAvailable
  //   .filter(car => car.brand === this.selectedBrand)
  //   .map(car => car.model)
  //   .filter((value, index, self) => self.indexOf(value) === index)
  // }

  // getDistinctColours(): Colour[] {
  //   console.log("Selected model: ", this.selectedModel);
  //   console.log(this.carsAvailable
  //   .filter(car => (car.brand === this.selectedBrand && car.model == this.selectedModel))
  //   .map(car => car.colours)[0])

  //   return this.carsAvailable
  //   .filter(car => (car.brand === this.selectedBrand && car.model == this.selectedModel))
  //   .map(car => car.colours)[0]
  // }

}
