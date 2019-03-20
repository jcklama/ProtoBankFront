import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAppReducer from '../reducers/app.reducer'
import { SetAuthInfo, SetBalances } from '../actions/app.actions'
import { loginInfo } from '../../models/loginInfo';
import { Balances } from '../../models/balances';
import { AuthResp } from '../../models/loggedInInfo';

@Injectable()
export class AppStoreDispatcher {

  // store is of type Store with a paramterized type of the state we define in our reducer
  constructor(private store: Store<fromAppReducer.State>) { }

  storeName = 'data';

  setAuthInfo(authInfo: AuthResp): void {
    this.store.dispatch(new SetAuthInfo(authInfo));
  }

  getAuthUserId() {
    return this.store.pipe(select(this.storeName, 'loginInfo', 'id'));
  }

  setBalances(balanceInfo: Balances): void {
    this.store.dispatch(new SetBalances(balanceInfo));
  }

}
