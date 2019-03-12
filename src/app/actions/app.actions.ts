import { Action } from '@ngrx/store'
import { loginInfo } from '../../models/loginInfo';

// enum used to set the type here & to match in the switch case in the reducer
export enum AppActionTypes {
  setAuthInfo = '[App] setAuthInfo'
}

export class SetAuthInfo implements Action {
  readonly type = AppActionTypes.setAuthInfo;
  // TODO: add type to payload
  constructor(public payload: loginInfo) { }
}

export type AppActions =
  SetAuthInfo

