import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormGroup } from '@angular/forms';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    // return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    return !!(control && control.invalid && (control.dirty || control.touched));
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
  dateFormControl = new FormControl('');
  
  matcher = new MyErrorStateMatcher();

  @Output() nickNotify = new EventEmitter();
  @Output() nameNotify = new EventEmitter();
  @Output() bodyNotify = new EventEmitter();
  @Output() dateNotify = new EventEmitter();
  @Output() notifyReady = new EventEmitter();

  reviewForm = new FormGroup({
    nick: this.nickFormControl,
    name: this.nameFormControl,
    body: this.reviewBodyFormControl,
    date: this.dateFormControl
  });

  constructor() { }

  ngOnInit(): void {
  }

  get nick() {
    return this.nickFormControl.value;
  }

  get name() {
    return this.nameFormControl.value;
  }

  get body() {
    return this.reviewBodyFormControl.value;
  }

  get date() {
    return this.dateFormControl.value;
  }

  onSubmit(): void {
    if (this.nickFormControl.valid && this.nick) {
      this.nickNotify.emit(this.nick);
    }
    if (this.nameFormControl.valid && this.nick) {
      this.nameNotify.emit(this.name);
    }
    if (this.reviewBodyFormControl.valid && this.body) {
      this.bodyNotify.emit(this.body);
    }
    if (this.date && this.dateFormControl.valid && this.date != new Date()) {
      this.dateNotify.emit(this.date);
      console.log("THIS DATE ",this.date)
    }
    this.notifyReady.emit();
    this.resetForms();
  }

  resetForms(): void {
    this.nickFormControl = new FormControl('', [Validators.required]);
    this.nameFormControl = new FormControl('', [Validators.required]);
    this.reviewBodyFormControl = new FormControl('', this.reviewBodyValidators);
    this.dateFormControl = new FormControl('');

    this.reviewForm = new FormGroup({
      nick: this.nickFormControl,
      name: this.nameFormControl,
      body: this.reviewBodyFormControl,
      date: this.dateFormControl
    });
  }

  public invalidFormControls() { 
    const invalidList = []; 
    const controls = this.reviewForm.controls; 
    for (const name in controls) { 
      if(controls[name].invalid) { 
        invalidList.push(name);
      } 
    }
    return invalidList;
    }

}
