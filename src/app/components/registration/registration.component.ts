import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppStoreDispatcher } from '../../store/dispatcher/dispatcher.store';

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
  submissionPending: boolean;

  constructor(
    private fb: FormBuilder,
    private dispatcher: AppStoreDispatcher,
  ) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      basic_info: this.fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        phone_number: ['', Validators.required],
        email_address: ['', Validators.required]
      }),
      address: this.fb.group({
        street_no_and_name: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        postal_code: ['', Validators.required]
      }),
      banking_info: this.fb.group({
        occupation: ['', Validators.required],
        annual_salary: ['', Validators.required],
        monthly_expenses: ['', Validators.required]
      }),
      products: this.fb.array(this.buildOptionControls())
    })

  }

  get products() {
    // console.log(this.registrationForm.get('products')["controls"]);
    return this.registrationForm.get('products');
  }

  buildOptionControls() {
    const controls: FormControl[] = [];
    this.productOptions.forEach((control) => {
      controls.push(this.fb.control(''));
    })
    return controls;
  }

  onSubmit() {
    this.dispatcher.setNewUser(this.registrationForm.value);
    this.dispatcher.getPendingState().subscribe(resp => {
      this.submissionPending = resp;
    });
  }


}

