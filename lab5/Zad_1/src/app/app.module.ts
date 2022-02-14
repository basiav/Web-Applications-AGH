import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { PhotoDetailsComponent } from './pages/photos/photo-details/photo-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostsComponent,
    PhotosComponent,
    NavbarComponent,
    PhotoDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
