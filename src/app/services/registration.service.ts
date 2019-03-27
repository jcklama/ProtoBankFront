import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient, HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { catchError, tap, map } from '../../../node_modules/rxjs/operators';
import { ROUTES } from 'src/app/routes/routes';
import { throwError } from '../../../node_modules/rxjs';
import { Registration } from '../models/registration';
import { RegisteredUser } from '../models/registeredUser';
import * as moment from 'moment';
import { RegistrationDashboardAdapter } from '../adapters/registration-dashboard.adpater';

@Injectable()
export class RegistrationService {

  constructor(
    private http: HttpClient
  ) { }

  addUser(form: Registration) {
    return this.http.post<RegisteredUser>(ROUTES.registration, form)
      .pipe(
        tap(resp => this.setSession(resp)),
        map((res: RegisteredUser) => new RegistrationDashboardAdapter().transform(res)),
        catchError(this.handleError)
      )
  }

  // TODO: abstract this method into an interceptor
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occured:', error.error.message);
    } else {
      console.log(`Backend returned code ${error.status}, ` +
        `body was ${JSON.stringify(error.error)}`);
    }
    return throwError('Something bad happened; please try again later.')
  }


  setSession(registeredUser: RegisteredUser) {
    const expiresAt = moment().add(registeredUser.expires_in, 'second');

    localStorage.setItem('id_token', registeredUser.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

}
