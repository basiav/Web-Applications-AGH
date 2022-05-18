import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Colour } from './colour';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb() {
    const cars = [
      {
        brand: 'Mercedes',
        model: 'AMG 3',
        colours: ['red', 'yellow', 'blue']
      },
      {
        brand: 'Mercedes',
        model: 'E Class 4',
        colours: ['red', 'green', 'blue']
      },
      {
        brand: 'Mercedes',
        model: 'G Class 3' ,
        colours: ['red' ]
      },
      {
        brand: 'Mercedes',
        model: 'AMG 5',
        colours: ['purple', 'yellow', 'blue']
      },
      {
        brand: 'Mercedes',
        model: 'S class',
        colours: ['blue', 'green']
      },
      {
        brand: 'Volvo',
        model: 'X90',
        colours: ['white', 'black', 'blue']
      },
      {
        brand: 'Volvo',
        model: 'X7-',
        colours: ['red', 'black']
      },
      {
        brand: 'Porsche',
        model: 'Carrera 1',
        colours: ['red', 'yellow', 'green']
      },
      {
        brand: 'Porsche',
        model: 'Carrera 1',
        colours: ['red', 'black', 'blue']
      }
    ];
    return {cars};
  }

  constructor() { }
}
