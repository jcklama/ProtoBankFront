import { ValidatorFn, AbstractControl } from '@angular/forms';

export namespace RegistrationValidators {

  export function forbiddenEmailValidator(emailRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const failedValidation = emailRe.test(control.value);
      return failedValidation ? null : { 'forbiddenEmail': true }
    }
  }

  export function noNumbersValidator(emailRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const failedValidation = emailRe.test(control.value);
      return failedValidation ? null : { 'numbersPresent': true }
    }
  }

  export function noLettersValidator(emailRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const failedValidation = emailRe.test(control.value);
      return failedValidation ? null : { 'lettersPresent': true }
    }
  }

  export function lettersNumbersOnlyValidator(emailRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const failedValidation = emailRe.test(control.value);
      return failedValidation ? null : { 'noLettersNoNumbers': true }
    }
  }

}
// this function is a factory that returns a validator function
// i.e. function that creates functions

// If not using a factory:

// function ageRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
//   if (control.value !== undefined && (isNaN(control.value) || control.value < 18 || control.value > 45)) {
//       return { 'ageRange': true };
//   }
//   return null;
// }
