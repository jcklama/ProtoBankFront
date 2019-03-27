import { ActionReducerMap } from '@ngrx/store'
import { AppActions, AppActionTypes } from '../actions/app.actions'
import { Balances } from '../../models/balances';
import { AuthResp } from '../../models/loggedInInfo';
import { RegisteredUser } from '../../models/registeredUser';
import { DashboardVM } from '../../models/viewModels/dashboard';

// set the states in the initial states in the reducer
export interface AppState {
  loginInfo: AuthResp,
  lastRegisteredUser: DashboardVM,
  balances: Balances,
  pending: boolean,
  error: boolean
}

export const initialState: AppState = {
  loginInfo: null,
  lastRegisteredUser: null,
  balances: null,
  pending: false,
  error: false
}

// define the reducer function
export function reducer(state = initialState, action: AppActions): AppState {
  switch (action.type) {
    case AppActionTypes.SetAuthInfo: {
      return {
        ...state,
        pending: true
      };
    }

    case AppActionTypes.SetAuthInfoSuccess: {
      return {
        ...state,
        loginInfo: action.payload,
        pending: false
      };
    }

    case AppActionTypes.SetAuthInfoError: {
      return {
        ...state,
        pending: false,
        error: true
      };
    }

    case AppActionTypes.SetBalanceInfo: {
      return {
        ...state,
        balances: action.payload
      }
    }

    case AppActionTypes.SetBalanceInfoSuccess: {
      return {
        ...state,
        balances: action.payload
      }
    }

    case AppActionTypes.SetBalanceInfoError: {
      return {
        ...state,
        balances: action.payload
      }
    }

    case AppActionTypes.RegisterUser: {
      return {
        ...state,
        pending: true
      }
    }

    case AppActionTypes.RegisterUserSuccess: {
      return {
        ...state,
        lastRegisteredUser: action.payload,
        pending: false
      }
    }

    case AppActionTypes.RegisterUserError: {
      return {
        ...state,
        pending: false,
        error: true
      }
    }

    case AppActionTypes.ResetErrorState: {
      return {
        ...state,
        error: false
      }
    }

    case AppActionTypes.ResetPendingState: {
      return {
        ...state,
        pending: false
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
