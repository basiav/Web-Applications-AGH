import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from '../shared/dish';

@Pipe({
  name: 'paginateSlice'
})
export class PaginateSlicePipe implements PipeTransform {

  transform(dishes: Dish[], start: number, end: number): Dish[] | undefined | null {
    return dishes.slice(start, end);
  }

}
