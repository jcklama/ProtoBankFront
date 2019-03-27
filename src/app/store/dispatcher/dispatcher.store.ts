import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAppReducer from '../reducers/app.reducer'
import { SetAuthInfo, SetBalances, ResetErrorState, ResetPendingState, RegisterUser } from '../actions/app.actions'
import { Balances } from '../../models/balances';
import { AuthResp } from '../../models/loggedInInfo';
import { LoginInfo } from '../../models/loginInfo';
import { Registration } from '../../models/registration';

@Injectable()
export class AppStoreDispatcher {

  // store is of type Store with a paramterized type of the state we define in our reducer
  constructor(private store: Store<fromAppReducer.State>) { }

  storeName = 'data';

  setAuthInfo(authInfo: LoginInfo): void {
    this.store.dispatch(new SetAuthInfo(authInfo));
  }

  getAuthUserId() {
    return this.store.pipe(select(this.storeName, 'loginInfo', 'id'));
  }

  setBalances(balanceInfo: Balances): void {
    this.store.dispatch(new SetBalances(balanceInfo));
  }

  setNewUser(regInfo: Registration) {
    this.store.dispatch(new RegisterUser(regInfo));
  }

  getNewlyRegisteredUser() {
    return this.store.pipe(select(this.storeName, 'lastRegisteredUser'));
  }

  getErrorState() {
    return this.store.pipe(select(this.storeName, 'error'));
  }

  getPendingState() {
    return this.store.pipe(select(this.storeName, 'pending'));
  }

  resetErrorState() {
    this.store.dispatch(new ResetErrorState());
  }

  resetPendingState() {
    this.store.dispatch(new ResetPendingState());
  }

}
