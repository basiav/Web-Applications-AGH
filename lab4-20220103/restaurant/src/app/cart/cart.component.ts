import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartReservations } from '../shared/reservations';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items!: CartReservations;

  constructor(
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.items = this.cartService.getCartItems();
  }

}
