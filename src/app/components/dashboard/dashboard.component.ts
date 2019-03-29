import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { AppStoreDispatcher } from '../../store/dispatcher/dispatcher.store';
import { DashboardVM } from '../../models/viewModels/dashboard';
import { DashboardService } from '../../services/dashboard.service';
import { Router, ActivatedRoute, RoutesRecognized, NavigationEnd, NavigationStart } from '@angular/router';
import { filter, pairwise, bufferCount, first, last } from 'rxjs/operators';
import { RoutingStateService } from '../../services/router-state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService,
    private dispatcher: AppStoreDispatcher,
    private router: Router,
    private routingState: RoutingStateService
  ) { }

  balances: DashboardVM = null;

  ngOnInit() {
    if (this.routingState.getPreviousUrl()) {
      if (this.routingState.getPreviousUrl().url === "/login") {
        this.getDataFromLogin();
      } else if (this.routingState.getPreviousUrl().url === "/registration") {
        this.getDataFromLatestRegisteredUser();
      }
    }
  }

  getDataFromLogin() {
    this.dispatcher.getAuthUserId().subscribe((authResp: string) => {
      // resp is the user id
      this.dashboardService.getBalances(authResp).subscribe((balanceResp: DashboardVM) => {
        this.balances = balanceResp;
        this.dispatcher.setBalances(balanceResp);
      })
    });
  }

  getDataFromLatestRegisteredUser() {
    this.dispatcher.getNewlyRegisteredUser().subscribe((resp: DashboardVM) => {
      this.balances = resp;
      this.dispatcher.setBalances(resp);
    })
  }

  logout() {
    this.authService.logout('/dashboard');
  }

}
