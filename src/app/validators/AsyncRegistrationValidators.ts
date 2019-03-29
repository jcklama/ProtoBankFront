import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '../../../node_modules/@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { map, catchError } from '../../../node_modules/rxjs/operators';
import { Observable } from '../../../node_modules/rxjs';

export function EmailContainsFnValidator(regService: RegistrationService): AsyncValidatorFn {

  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const fn = control.get('basic_info.first_name').value;
    const ln = control.get('basic_info.last_name').value;
    const email = control.get('basic_info.email_address').value;

    return regService.checkIfRegistered(fn, ln, email)
      .pipe(
        map(userAlreadyExists => (userAlreadyExists ? { lnFnEmailValidationFail: true } : null),
          catchError(() => null) // if there is an error, inconclusive that there is a validation error so just return null
        ))
  }
}



// export class EmailContainsFnValidator {

//   static createValidator(regService: RegistrationService) {
//     return (control: AbstractControl) => {
//       const fn = control.get('first_name').value;
//       const ln = control.get('last_name').value;
//       const email = control.get('email_address').value;

//       return regService.checkIfRegistered(fn, ln, email)
//         .pipe(
//           map(alreadyExists => (alreadyExists ? { lnFnEmailValidationFail: true } : null),
//             catchError(() => null) // if there is an error, inconclusive that there is a validation error so just return null
//           ))
//     }
//   }
// }

// alternative way to write this is to create a factory method that returns AsyncValidationFn
// AsyncValidationFn returns ValidationError obj

// Source: https://www.concretepage.com/angular-2/angular-custom-async-validator-example
