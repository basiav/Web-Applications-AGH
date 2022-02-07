import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDishFormComponent } from './dishes/add-dish-form/add-dish-form.component';
import { DishesComponent } from './dishes/dishes.component';

const routes: Routes = [
  {path: 'dishes', component: DishesComponent},
  {path: '', redirectTo: '/dishes', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
