import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { AppStoreDispatcher } from '../dispatcher/dispatcher.store';
import { DashboardVM } from '../../models/viewModels/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private dispatcher: AppStoreDispatcher
  ) { }

  balances: DashboardVM = null;

  ngOnInit() {
    this.dispatcher.getAuthUserId().subscribe(authResp => {
      // resp is the user id
      this.authService.getBalances(authResp).subscribe(balanceResp => {
        console.log(balanceResp);
        this.balances = balanceResp;
        this.dispatcher.setBalances(balanceResp);
      })
    });

  }

}
