import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';
import { Dish } from '../shared/dish';
import { FilterCriteria } from '../shared/filterCriteria';

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
    transform(dishes: Dish[], filterCriterium: FilterCriteria, filterArgs: string[]): Dish[] {
      // return dishes;
      switch(filterCriterium){
        case FilterCriteria.Cuisine:
          return dishes.filter(dish => {
            return dish.cuisine.some(cuisine => filterArgs.includes(cuisine));
          });
        
        case FilterCriteria.DishCategory:
          return dishes.filter(dish => {
            return dish.category.some(cat => filterArgs.includes(cat));
          });
        
        default:
          return dishes;
      }
    }

}
