import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from '../models/dish.model';
import { FilterCriteria } from '../models/filterCriteria';
import { StarReviewService } from '../services/star-review.service';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  
  constructor(public starService: StarReviewService) { }

  transform(dishes: Dish[], filterCriterium: FilterCriteria, filterArgs: string[], 
    numFilterArg?: number): Dish[] {

      switch(filterCriterium){
      case FilterCriteria.Cuisine:
        return dishes.filter(dish => {
          return dish.cuisine.some(cuisine => filterArgs.includes(cuisine));
        });
      
      case FilterCriteria.DishCategory:
        return dishes.filter(dish => {
          return dish.category.some(cat => filterArgs.includes(cat));
        });
      
      case FilterCriteria.Price:
        return dishes.filter(dish => {
          return numFilterArg && (dish.price <= numFilterArg);
        });
      
      case FilterCriteria.Review:
        return dishes.filter(dish => {
          return numFilterArg && (this.starService.getDishAvgStars(dish.id) >= numFilterArg);
        });
      
      case FilterCriteria.Name:
        return dishes.filter(dish => {
          return dish.name.toLowerCase().includes(filterArgs[0].toLowerCase());
        })
      
      default:
        return dishes;
    }
  }

}
