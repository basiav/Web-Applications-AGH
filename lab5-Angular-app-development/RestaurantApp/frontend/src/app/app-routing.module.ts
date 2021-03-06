import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { AddDishFormComponent } from './add-dish-form/add-dish-form.component';
import { DishesComponent } from './dishes/dishes.component';
import { MainComponent } from './main/main.component';
import { DishDetailComponent } from './dish-detail/dish-detail.component';

const routes: Routes = [
  {path: 'dishes', component: DishesComponent},
  {path: 'add-dish', component: AddDishFormComponent},
  {path: 'cart', component: CartComponent},
  {path: 'home', component: MainComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'dishes/:id', component: DishDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
