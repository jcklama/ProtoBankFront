import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  SetAuthInfo,
  SetBalances,
  RegisterUser,
  AppActionTypes,
  AppActions,
  RegisterUserSuccess,
  RegisterUserError,
  SetAuthInfoError,
  SetAuthInfoSuccess
} from '../actions/app.actions';
import { switchMap, map, catchError, debounceTime, exhaustMap } from '../../../../node_modules/rxjs/operators';
import { RegistrationService } from '../../services/registration.service';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth-service.service';
import { of } from '../../../../node_modules/rxjs';
import { Router } from '../../../../node_modules/@angular/router';

@Injectable()
export class AppEffects {

  constructor(
    private action$: Actions<AppActions>,
    private registrationService: RegistrationService,
    private authService: AuthService,
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  @Effect()
  authenticateLogin$ = this.action$.pipe(
    ofType(AppActionTypes.SetAuthInfo),
    debounceTime(1000),
    exhaustMap((action: SetAuthInfo) => {
      const payload = action.payload;
      return this.authService
        .login(payload.username, payload.password)
        .pipe(
          map(response => {
            // console.log(response);
            this.router.navigate(['/dashboard']);
            return new SetAuthInfoSuccess(response);
          }),
          catchError(error => {
            // console.log(error);
            return of(new SetAuthInfoError(error));
          })
        );
    })
  );

  @Effect()
  registerUser$ = this.action$.pipe(
    ofType(AppActionTypes.RegisterUser),
    debounceTime(1000),
    exhaustMap((action: RegisterUser) => {
      const payload = action.payload
      return this.registrationService
        .addUser(payload)
        .pipe(
          // by piping, we are operating on the response from the http call
          // by mapping, we are 'mapping' the response to a returned store action
          map(response => {
            console.log(response);
            this.router.navigate(['/dashboard']);
            return new RegisterUserSuccess(response);
          }),
          catchError(error => {
            console.log(error);
            return of(new RegisterUserError(error));
          })
        )
    })
  )

  // @Effect()
  // loadDashboardAfterRegistration$ = this.action$.pipe(
  //   ofType(AppActionTypes.SetBalanceInfo),
  //   debounceTime(1000),
  //   exhaustMap((action: SetBalances) => {
  //     const payload = action.payload;
  //     return this.dashboardService
  //     .getBalances(payload)
  //     .pipe(

  //     )
  //   })
  // )




}

