import { Action } from '@ngrx/store'
import { loginInfo } from '../../models/loginInfo';
import { Balances } from '../../models/balances';
import { AuthResp } from '../../models/loggedInInfo';

// enum used to set the type here & to match in the switch case in the reducer
export enum AppActionTypes {
  setAuthInfo = '[App] setAuthInfo',
  setBalanceInfo = '[App] setBalanceInfo'
}

export class SetAuthInfo implements Action {
  readonly type = AppActionTypes.setAuthInfo;
  constructor(public payload: AuthResp) { }
}

export class SetBalances implements Action {
  readonly type = AppActionTypes.setBalanceInfo
  constructor(public payload: Balances) { }
}

export type AppActions =
  SetAuthInfo |
  SetBalances

