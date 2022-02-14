import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/models/image';
import { JsonPlaceholderService } from 'src/app/services/json-placeholder.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  photos: Image[] = [];

  constructor(private jsonPlaceholderService: JsonPlaceholderService) { }

  ngOnInit(): void {
    this.getPhotos();
  }

  getPhotos(): void {
    this.jsonPlaceholderService.getPhotos().subscribe((data) =>{
      this.photos = data.slice(0,100);
    })
  }

}
