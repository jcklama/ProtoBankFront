import { ActionReducerMap } from '@ngrx/store'
import { AppActions, AppActionTypes } from '../actions/app.actions'
import { Balances } from '../../models/balances';
import { AuthResp } from '../../models/loggedInInfo';

// set the states in the initial states in the reducer
export interface AppState {
  loginInfo: AuthResp,
  balances: Balances
}

export const initialState: AppState = {
  loginInfo: null,
  balances: null
}

// define the reducer function
export function reducer(state = initialState, action: AppActions): AppState {
  switch (action.type) {
    case AppActionTypes.setAuthInfo: {
      return {
        ...state,
        loginInfo: action.payload
      };
    }

    case AppActionTypes.setBalanceInfo: {
      return {
        ...state,
        balances: action.payload
      }
    }

    default:
      return state;
  }
}

// We define an ActionReducerMap with a paramterized type of State
export interface State {
  data: AppState
}
// reducers conforms to the shape of State (i.e. data: reducer)
// used in the module when defining the StoreModule
export const reducers: ActionReducerMap<State> = {
  data: reducer
}
