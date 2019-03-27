import { Action } from '@ngrx/store'
import { Balances } from '../../models/balances';
import { AuthResp } from '../../models/loggedInInfo';
import { Registration } from '../../models/registration';
import { LoginInfo } from '../../models/loginInfo';
import { RegisteredUser } from '../../models/registeredUser';
import { DashboardVM } from '../../models/viewModels/dashboard';

// enum used to set the type here & to match in the switch case in the reducer
export enum AppActionTypes {
  SetAuthInfo = '[App] SetAuthInfo',
  SetAuthInfoSuccess = '[App] SetAuthInfoSuccess',
  SetAuthInfoError = '[App] SetAuthInfoError',
  SetBalanceInfo = '[App] SetBalanceInfo',
  SetBalanceInfoSuccess = '[App] SetBalanceInfoSuccess',
  SetBalanceInfoError = '[App] SetBalanceInfoError',
  RegisterUser = '[App] RegisterUser',
  RegisterUserSuccess = '[App] RegisterUserSuccess',
  RegisterUserError = '[App] RegisterUserError',
  ResetErrorState = '[App] ResetErrorState',
  ResetPendingState = '[App] ResetPendingState'
}

export class SetAuthInfo implements Action {
  readonly type = AppActionTypes.SetAuthInfo;
  constructor(public payload: LoginInfo) { }
}

export class SetAuthInfoSuccess implements Action {
  readonly type = AppActionTypes.SetAuthInfoSuccess;
  constructor(public payload: AuthResp) { }
}

export class SetAuthInfoError implements Action {
  readonly type = AppActionTypes.SetAuthInfoError;
  constructor(public payload: any) { }
}

export class SetBalances implements Action {
  readonly type = AppActionTypes.SetBalanceInfo
  constructor(public payload: Balances) { }
}

export class SetBalancesSuccess implements Action {
  readonly type = AppActionTypes.SetBalanceInfoSuccess
  constructor(public payload: Balances) { }
}

export class SetBalancesError implements Action {
  readonly type = AppActionTypes.SetBalanceInfoError
  constructor(public payload: any) { }
}

export class RegisterUser implements Action {
  readonly type = AppActionTypes.RegisterUser
  constructor(public payload: Registration) { }
}

export class RegisterUserSuccess implements Action {
  readonly type = AppActionTypes.RegisterUserSuccess
  constructor(public payload: DashboardVM) { }
}

export class RegisterUserError implements Action {
  readonly type = AppActionTypes.RegisterUserError
  constructor(public payload: any) { }
}

export class ResetErrorState implements Action {
  readonly type = AppActionTypes.ResetErrorState
  constructor() { }
}

export class ResetPendingState implements Action {
  readonly type = AppActionTypes.ResetPendingState
  constructor() { }
}

export type AppActions =
  SetAuthInfo |
  SetAuthInfoSuccess |
  SetAuthInfoError |
  SetBalances |
  SetBalancesSuccess |
  SetBalancesError |
  RegisterUser |
  RegisterUserSuccess |
  RegisterUserError |
  ResetErrorState |
  ResetPendingState

