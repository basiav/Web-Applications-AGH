import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-photo-slider',
  templateUrl: './photo-slider.component.html',
  styleUrls: ['./photo-slider.component.css']
})
export class PhotoSliderComponent implements OnInit {
  @Input() photos!: String[];
  slideIndex: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.showSlides(this.slideIndex);
  }

  // Next/previous controls
  plusSlides(n: number): void {
    this.showSlides(this.slideIndex += n);
  }

  // Thumbnail image controls
  currentSlide(n: number): void {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n: number): void {
    let i = 0;
    let slides = Array.from(document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>);
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      this.slideIndex = 1
    }
    if (n < 1) {
      this.slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex-1].style.display = "block";
    dots[this.slideIndex-1].className += " active";
  }

}
