import { Component, InjectionToken, OnInit, Inject } from '@angular/core';

export const TITLE_ARG = new InjectionToken<string>('title_arg');
export const BODY_ARG = new InjectionToken<string>('body_arg');

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [
    { provide: TITLE_ARG, useValue: 'Rating disabled from this view' },
    { provide: BODY_ARG, useValue: 'Open dish details view to rate this dish.' }
  ]
})
export class DialogComponent implements OnInit {
  title: string;
  body: string;
  close: string = "Close";

  constructor(
    @Inject(TITLE_ARG) t: string,
    @Inject(BODY_ARG) b: string
  ) { 
    this.title = t;
    this.body = b;
  }

  ngOnInit(): void {
  }

}
