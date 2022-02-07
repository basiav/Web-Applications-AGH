import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { Dish } from 'src/app/dish';
import { DishService } from 'src/app/dish.service';

@Component({
  selector: 'app-add-dish-form',
  templateUrl: './add-dish-form.component.html',
  styleUrls: ['./add-dish-form.component.css']
})
export class AddDishFormComponent implements OnInit {
  // @Output() dish?: Dish;
  @Output() newDishNotify = new EventEmitter();
  
  constructor(
    private fb: FormBuilder,
    private dishService: DishService
  ) { }

  ngOnInit(): void {
    console.log("OnInit: ", this.genId())
  }
  
  dishForm = this.fb.group({
    name: ['', Validators.required],
    cuisines: this.fb.array([
      this.fb.control('')
    ]),
    categories: this.fb.array([
      this.fb.control('')
    ]),
    ingredients: this.fb.array([
      this.fb.control('')
    ]),
    maxDailyAmount: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    photos: this.fb.array([
      this.fb.control('')
    ]),
  });

  get name() {
    return this.dishForm.get('name');
  }

  get aliases() {
    return this.dishForm.get('aliases') as FormArray;
  }

  get cuisines() {
    return this.dishForm.get('cuisines') as FormArray;
  }

  get categories() {
    return this.dishForm.get('categories') as FormArray;
  }

  get ingredients() {
    return this.dishForm.get('ingredients') as FormArray;
  }

  get maxDailyAmount() {
    return this.dishForm.get('maxDailyAmount');
  }

  get price() {
    return this.dishForm.get('price');
  }

  get description() {
    return this.dishForm.get('description');
  }

  get photos() {
    return this.dishForm.get('photos') as FormArray;
  }

  updateProfile() {
    this.dishForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  addCuisine() {
    this.cuisines.push(this.fb.control(''));
  }

  addCategory() {
    this.categories.push(this.fb.control(''));
  }

  addIngredient() {
    this.ingredients.push(this.fb.control(''));
  }

  addPhoto() {
    this.photos.push(this.fb.control(''));
  }

  // Has to be async with setTimeout
  async genId(): Promise<number>{
    var id = 0;
    this.dishService.genId()
    .subscribe(ids => {
      id = ids.valueOf();
    }, (err) => console.log("error: ", err));

    await new Promise(f => setTimeout(f, 1000));
    return id;
  }

  async onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.dishForm.value);
    if (this.name && this.cuisines && this.categories &&
      this.ingredients && this.maxDailyAmount && this.price && this.description
      && this.photos) {
        let d: Dish = {
          id: await this.genId(),
          name: this.name.value,
          cuisine: this.cuisines.getRawValue(),
          category: this.categories.getRawValue(),
          ingredients: this.ingredients.getRawValue(),
          maxDailyAmount: this.maxDailyAmount.value,
          price: this.price.value,
          description: this.description.value,
          photos: this.photos.getRawValue(),
        };

        this.newDishNotify.emit(d);
    }
  
  }



}
