import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { AddDishFormComponent } from './components/add-dish-form/add-dish-form.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { MainComponent } from './components/main/main.component';
import { DishDetailComponent } from './components/dish-detail/dish-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: 'dishes', component: DishesComponent},
  {path: 'add-dish', component: AddDishFormComponent},
  {path: 'cart', component: CartComponent},
  {path: 'home', component: MainComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'dishes/:id', component: DishDetailComponent},
  {path: 'login-page', component: LoginComponent},
  {path: 'register-page', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
