import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Dish } from '../dish';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items!: Map<Dish, number>;

  constructor(
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

}
