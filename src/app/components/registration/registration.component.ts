import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppStoreDispatcher } from '../../store/dispatcher/dispatcher.store';
import { RegistrationValidators } from '../../validators/SyncRegistrationValidators';
import { EmailContainsFnValidator } from '../../validators/AsyncRegistrationValidators';
import { RegistrationService } from '../../services/registration.service';

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
    private registrationService: RegistrationService
  ) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      basic_info: this.fb.group({
        first_name: ['', [Validators.required, Validators.minLength(2)]],
        last_name: ['', [Validators.required, Validators.minLength(2)]],
        phone_number: ['', [Validators.required]],
        email_address: ['', [Validators.required, RegistrationValidators.forbiddenEmailValidator(/.+@[a-zA-z]+\.[a-zA-z]+/i)]]
      }),
      address: this.fb.group({
        street_no_and_name: ['', [Validators.required]],
        city: ['', [Validators.required, RegistrationValidators.noNumbersValidator(/^[a-zA-z]+$/)]],
        country: ['', [Validators.required, RegistrationValidators.noNumbersValidator(/^[a-zA-z]+$/)]],
        postal_code: ['', [Validators.required, RegistrationValidators.
          lettersNumbersOnlyValidator(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d$/)]]
      }),
      banking_info: this.fb.group({
        occupation: ['', [Validators.required, RegistrationValidators.noNumbersValidator(/^[a-zA-z]+$/)]],
        annual_salary: ['', [Validators.required, RegistrationValidators.noLettersValidator(/^[0-9]+$/)]],
        monthly_expenses: ['', [Validators.required, RegistrationValidators.noLettersValidator(/^[0-9]+$/)]]
      }),
      products: this.fb.array(this.buildOptionControls())
    }, { asyncValidators: EmailContainsFnValidator(this.registrationService) })
  }

  get products() {
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

  getControl(controlOne: string, controlTwo?: string) {
    if (controlOne && controlTwo) {
      return this.registrationForm.get(controlOne).get(controlTwo);
    } else if (controlOne && !controlTwo) {
      return this.registrationForm.get(controlOne);
    }
    // better way is to just have one method whilst passing in ('basic_info.first_name') as an example
  }

  numberValidator(event: any) {
    const input = event.target.value;
    if (!/^[0-9]+$|\(|\)|\-/.test(input)) {
      event.target.value = event.target.value.replace(/[^0-9]/gi, '')
    }
  }

}

