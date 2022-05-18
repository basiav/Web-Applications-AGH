import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  count: number = 0;
  @Output() countEvent = new EventEmitter();
  @Input() isDisabled: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  increment() {
    if (!this.isDisabled){
      this.count++;
      this.countEvent.emit(this.count);
    }
  }

  reset() {
    this.count = 0;
    this.countEvent.emit(this.count)
  }

}
