import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Balances } from '../models/balances';
import { catchError, tap, map } from 'rxjs/operators';
import { ROUTES } from '../routes/routes';
import { throwError } from 'rxjs';
import { LoginDashBoardAdapter } from '../adapters/login-dashboard.adapter';

@Injectable()
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  getBalances(id: string) {
    const path = ROUTES.balances.replace('{id}', id);
    return this.http.get<Balances>(path)
      .pipe(
        map((resp: Balances) => new LoginDashBoardAdapter().transform(resp)),
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

}
