import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { DishesComponent } from './dishes/dishes.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: 'dishes', component: DishesComponent},
  {path: 'cart', component: CartComponent},
  {path: 'home', component: MainComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
