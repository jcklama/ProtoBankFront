import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { ROUTES } from '../routes/routes';
import * as moment from 'moment';
import { AuthResp } from '../models/loggedInInfo';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  baseUrl: string;

  login(username: string, password: string): Observable<any> {
    const body = {
      username: username,
      password: password
    }
    // post now receives a typed object of AuthResp
    return this.http.post<AuthResp>(ROUTES.login, body)
      .pipe(
        // tap performs side effects/actions; peers into the request/response but does not mutate it (e.g. logging)
        tap(res => {
          this.setSession(res)
        }),
        catchError(this.handleError),
        // In this case to prevent reciever of Observable from accidentally triggering multiple POST requests due to multiple subscriptions
        // if there are taxing computations / will have late subscribers
        shareReplay()
      )
  }

  // Error inspection, interpretation, and resolution is something you want to do in the service, not the component.
  // client-side error <-- JavaScript ErrorEvent objects
  // server-side error <-- error responses
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occured:', error.error.message);
    } else {
      console.log(`Backend returned code ${error.status}, ` +
        `body was ${JSON.stringify(error.error)}`);
    }

    return throwError('Something bad happened; please try again later.')
  }

  private setSession(authResp: AuthResp) {
    const expiresAt = moment().add(authResp.expiresIn, 'second');

    localStorage.setItem('id_token', authResp.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  // Helper methods help display certain elements on the UI based on the local storage token state:
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public getExpiration() {
    const expiration = localStorage.getItem("expires_at"); // type of string
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt); // returns a moment object
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  public logout(route: string) {
    localStorage.removeItem('expires_at');
    localStorage.removeItem('id_token');
    this.router.navigateByUrl(route);
  }



}
