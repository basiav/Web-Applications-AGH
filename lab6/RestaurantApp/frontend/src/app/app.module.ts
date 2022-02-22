import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { AddDishFormComponent } from './components/add-dish-form/add-dish-form.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { CartComponent } from './components/cart/cart.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { DishSearchComponent } from './components/dishes/dish-search/dish-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { SearchPipe } from './pipes/search.pipe';
import {MatSliderModule} from '@angular/material/slider'; 
import { StarReviewService } from './services/star-review.service';
import { MapComponent } from './components/main/map/map.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PaginatorComponent } from './components/dishes/paginator/paginator.component';
import { PaginateSlicePipe } from './pipes/paginate-slice.pipe';
import { DishDetailComponent } from './components/dish-detail/dish-detail.component';
import { PhotoSliderComponent } from './components/dish-detail/photo-slider/photo-slider.component';
import { ReviewFormComponent } from './components/review-form/review-form.component';
import {MatInputModule} from '@angular/material/input'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import { CurrencyChoiceComponent } from './components/top-bar/currency-choice/currency-choice.component';
import {MatRadioModule} from '@angular/material/radio';
import { ExpansionMenuComponent } from './components/top-bar/expansion-menu/expansion-menu.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DishesComponent,
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
    PhotoSliderComponent,
    ReviewFormComponent,
    CurrencyChoiceComponent,
    ExpansionMenuComponent,
    DialogComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSliderModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatRadioModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [StarReviewService, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
