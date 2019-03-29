import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map, every, flatMap, delay } from 'rxjs/operators';
import { ROUTES } from '../routes/routes';
import { throwError } from 'rxjs';
import { Registration } from '../models/registration';
import { RegisteredUser } from '../models/registeredUser';
import * as moment from 'moment';
import { RegistrationDashboardAdapter } from '../adapters/registration-dashboard.adpater';
import { RegisteredUserInfo } from '../models/registeredUserInfo';

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

  checkIfRegistered(fn: string, ln: string, email: string) {
    return this.http.get<RegisteredUserInfo[]>(ROUTES.registeredUsersInfo)
      .pipe(
        delay(500),
        map(data => // data returns the array of RegsisteredUsers
          data.filter(user => { // applying filter function here to each element in array
            return user.basic_info.first_name === fn && user.basic_info.last_name === ln && user.basic_info.email_address === email
          })),
        map(numOfMatchedUsers => numOfMatchedUsers.length > 0 ? true : false)
      )
    // interception methods can be handled here or in the validator
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
