import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  menu!: Map<string, number>;

  constructor() { }

  ngOnInit(): void {
    this.menu = new Map<string, number>();
  }

}
