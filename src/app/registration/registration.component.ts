import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  productOptions = [
    { name: 'Chequing' },
    { name: 'Savings' },
    { name: 'Line of Credit' },
    { name: 'Mortage' },
    { name: 'Credit Card' }
  ]

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      basicInfo: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        emailAddress: ['', Validators.required]
      }),
      address: this.fb.group({
        streetNameNumber: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        postalCode: ['', Validators.required]
      }),
      bankingInfo: this.fb.group({
        occupation: ['', Validators.required],
        salary: ['', Validators.required],
        expenses: ['', Validators.required]
      }),
      products: this.fb.array(this.buildOptionControls())
    })
  }

  get products() {
    console.log(this.registrationForm.get('products')["controls"]);
    return this.registrationForm.get('products');
  }

  buildOptionControls() {
    const controls = [];
    this.productOptions.forEach((control) => {
      controls.push(this.fb.control(''));
    })
    return controls;
  }

}
