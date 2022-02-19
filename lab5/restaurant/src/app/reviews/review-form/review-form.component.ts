import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
  nickFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);
  reviewBodyValidators = [Validators.required, Validators.minLength(50), Validators.maxLength(500)]
  reviewBodyFormControl = new FormControl('', this.reviewBodyValidators);
  dateFormControl = new FormControl(new Date());
  
  matcher = new MyErrorStateMatcher();

  constructor() { }

  ngOnInit(): void {
  }

  logg(){
    console.log("NICK: ", this.nickFormControl.value);
  }


}
