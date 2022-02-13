import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from '../shared/dish';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  // transform(courses: Dish[], searchText: string): Dish[] { 
  //   if (!courses) 
  //    return []; 
  //   if (!searchText) 
  //    return courses; 
  //   searchText = searchText.toLowerCase(); 
  //    return courses.filter(course => { 
  //    return course.name.toLowerCase().includes(searchText); 
  //    }); 
  //    }
    transform(dishes: Dish[], ...args: unknown[]): Dish[] {
      return dishes;
    }

}
