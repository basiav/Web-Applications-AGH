import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PhotoDetailsComponent } from './pages/photos/photo-details/photo-details.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { PostsComponent } from './pages/posts/posts.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'posts', component:PostsComponent},
  {path:'photos', component:PhotosComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'detail/:id', component: PhotoDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
