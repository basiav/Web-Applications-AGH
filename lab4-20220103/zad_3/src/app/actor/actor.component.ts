import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Actor } from '../actor';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {
  actor?: Actor;

  constructor(public router: Router) { }

  ngOnInit(): void {
    console.log("This router url: ", this.router.url);
  }

  registerActor(name: string, surname: string, movie: string): void {
    if (!this.actor) {
      this.actor = <Actor>{}
    }
    if (name.trim() && surname.trim() && movie.trim()){
      this.actor.name = name;
      this.actor.surname = surname;
      this.actor.movie = movie;
    } else {
      window.alert("All three values are required to register you actor!");
    }

  }

}
