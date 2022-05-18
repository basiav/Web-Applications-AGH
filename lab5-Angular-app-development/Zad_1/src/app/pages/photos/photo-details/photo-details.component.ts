import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/models/image';
import { JsonPlaceholderService } from 'src/app/services/json-placeholder.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {
  photo!: Image;

  constructor(
    private route: ActivatedRoute,
    private jsonPlaceholderService: JsonPlaceholderService
  ) { }

  ngOnInit(): void {
    this.getPhoto();
  }

  getPhoto(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.jsonPlaceholderService.getPhoto(id)
    .subscribe(photo => this.photo = photo);
  }

}
