import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  count: number = 0;
  disable: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  updateClicksNumber(event: number): void {
    this.count = event;

    if (this.count === 0) {
      this.reset();
    }

    if (this.count >= 10) {
      this.disable = true;
    }
  }

  reset(): void {
    this.disable = false;
  }

}
