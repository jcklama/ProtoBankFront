import { Injectable } from "../../../node_modules/@angular/core";
import { Router, NavigationEnd } from '../../../node_modules/@angular/router';
import { filter } from '../../../node_modules/rxjs/operators';


@Injectable()
export class RoutingStateService {
  private history: any[] = [];

  constructor(
    private router: Router
  ) { }

  public loadRouting(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
    )
      .subscribe((resp: NavigationEnd) => {
        this.history = [...this.history, resp];
      })
  }

  public getHistory() {
    return this.history;
  }

  public getPreviousUrl() {
    return this.history[this.history.length - 2] || '';
  }
}
