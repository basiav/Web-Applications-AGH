import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-currency-choice',
  templateUrl: './currency-choice.component.html',
  styleUrls: ['./currency-choice.component.css']
})
export class CurrencyChoiceComponent implements OnInit {
  currency: string = this.cartService.currency;
  availableCurrencies = [
    {name: 'GBP', symbol: '£'}, 
    {name: 'USD', symbol: 'USD'}
  ];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  setCurrency(newCurrency: string): void {
    this.currency = newCurrency;
    this.cartService.setCurrency(newCurrency);
  }

}
