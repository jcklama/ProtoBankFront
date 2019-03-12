import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAppReducer from '../reducers/app.reducer'
import { SetAuthInfo } from '../actions/app.actions'

@Injectable()
export class AppStoreDispatcher {

  // store is of type Store with a paramterized type of the state we define in our reducer
  constructor(private store: Store<fromAppReducer.State>) { }

  // TODO: add argument types
  setAuthInfo(authInfo): void {
    this.store.dispatch(new SetAuthInfo(authInfo));
  }

  getAuthInfo() {
    // return this.store.pipe(select())
  }
}
