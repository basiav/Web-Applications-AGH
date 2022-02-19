import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { DishesComponent } from './dishes/dishes.component';
import { MessagesComponent } from './messages/messages.component';
import { AddDishFormComponent } from './add-dish-form/add-dish-form.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CartComponent } from './cart/cart.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { DishSearchComponent } from './dishes/dish-search/dish-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { SearchPipe } from './pipes/search.pipe';
import {MatSliderModule} from '@angular/material/slider'; 
import { StarService } from './services/star.service';
import { MapComponent } from './main/map/map.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PaginatorComponent } from './dishes/paginator/paginator.component';
import { PaginateSlicePipe } from './pipes/paginate-slice.pipe';
import { DishDetailComponent } from './dish-detail/dish-detail.component';
import { PhotoSliderComponent } from './dish-detail/photo-slider/photo-slider.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DishesComponent,
    MessagesComponent,
    AddDishFormComponent,
    TopBarComponent,
    CartComponent,
    ReviewsComponent,
    DishSearchComponent,
    SearchPipe,
    MapComponent,
    PaginatorComponent,
    PaginateSlicePipe,
    DishDetailComponent,
    PhotoSliderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSliderModule,
    MatPaginatorModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService,
      {dataEncapsulation: false}),
    BrowserAnimationsModule,
  ],
  providers: [StarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
