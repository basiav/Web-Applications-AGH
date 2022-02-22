import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Dish } from 'src/app/components/models/dish.model';


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() dishes: Dish[] = [];
  @Output() notify = new EventEmitter();
  
  constructor() { }
  
  ngOnInit(): void { }

  onPageChange(event: PageEvent) {
    const startIdx = event.pageIndex * event.pageSize;
    let endIdx = startIdx + event.pageSize;
    if(endIdx > this.dishes.length) {
      endIdx = this.dishes.length;
    }
    this.notify.emit([startIdx, endIdx]);
  }

}