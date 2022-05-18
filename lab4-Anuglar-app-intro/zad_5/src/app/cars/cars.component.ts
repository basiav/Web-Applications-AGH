import { Component, OnInit } from '@angular/core';

import { CarService } from './car.service';
import { Car } from '../car';
import { Colour } from '../colour';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  carsAvailable: Car[] = []; 
  selectedBrand?: string;
  selectedModel?: string;
  selectedColour?: Colour;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.carService.getCars()
    .subscribe(cars => this.carsAvailable = cars);
  }

  getDistinctBrands(): string[] {
    return this.carsAvailable.map(car => car.brand)
    .filter((value, index, self) => self.indexOf(value) === index)
  }

  getDistinctModels(): string[] {
    console.log("Selected brand: ", this.selectedBrand);
    console.log(this.carsAvailable
      .filter(car => car.brand === this.selectedBrand)
      .map(car => car.model)
      .filter((value, index, self) => self.indexOf(value) === index))

    return this.carsAvailable
    .filter(car => car.brand === this.selectedBrand)
    .map(car => car.model)
    .filter((value, index, self) => self.indexOf(value) === index)
  }

  getDistinctColours(): Colour[] {
    console.log("Selected model: ", this.selectedModel);
    console.log(this.carsAvailable
    .filter(car => (car.brand === this.selectedBrand && car.model == this.selectedModel))
    .map(car => car.colours)[0])

    return this.carsAvailable
    .filter(car => (car.brand === this.selectedBrand && car.model == this.selectedModel))
    .map(car => car.colours)[0]
  }

}
