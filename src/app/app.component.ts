import { Component } from '@angular/core';
import { RoutingStateService } from './services/router-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProtoBankFront';

  constructor(
    routingState: RoutingStateService
  ) {
    routingState.loadRouting();
  }
}
