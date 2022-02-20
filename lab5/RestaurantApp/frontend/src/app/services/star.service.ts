import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';

export interface Star {
  // dishId: number;
  value: number;
}

// export type StarMap = Map<Star["dishId"], Star>;
export type StarMap = Map<Dish["id"], Star[]>;

@Injectable({
  providedIn: 'root'
})
export class StarService {
  stars!: StarMap;

  constructor() { 
    this.stars = new Map<Dish["id"], Star[]>();
  }

  getDishStars(dishId: number): Star[] | undefined {
    return this.stars.has(dishId) && this.stars.get(dishId) ? this.stars.get(dishId) : [];
  }

  setStar(dishId: number, val: number): void {
    if(this.stars.has(dishId) && this.stars.get(dishId)) {
      this.stars.get(dishId)?.push({value: val});
    } else {
      let arr: Star[] = [];
      let star: Star = {value: val};
      arr.push(star);
      this.stars.set(dishId, arr);
    }
  }

  getDishAvgStars(dishId: number): Star["value"] {
    let dishStars: Star[] | undefined = this.getDishStars(dishId);
    let precision: number = 2;
    return dishStars && dishStars.length ? 
    this.round(
      dishStars
      .map(star => star.value)
      .reduce((total, val) => total + val) / dishStars.length, precision) : 0
  }

  round(value: number, precision: number): number {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

}
