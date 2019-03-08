import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { loginInfo } from '../../models/loginInfo';
import { throwError } from '../../../node_modules/rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  loginUrl: "http://localhost:3000/login";

  login(loginInfo: object) {

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // }
    return this.http.post<loginInfo>(this.loginUrl, { "test": "test" })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occured:', error.error.message);
    } else {
      console.log(`Backend returned code ${error.status}, ` +
        `body was ${error.error}`);
    }

    return throwError('Something bad happened; please try again later.')
  }

}
