import { ActionReducerMap } from '@ngrx/store'
import { AppActions, AppActionTypes } from '../actions/app.actions'

// set the states in the initial states in the reducer
export interface AppState {
  username: string,
  password: string
}

export const initialState: AppState = {
  username: null,
  password: null
}

// define the reducer function
export function reducer(state = initialState, action: AppActions): AppState {
  switch (action.type) {
    case AppActionTypes.setAuthInfo: {
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password
      };
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
