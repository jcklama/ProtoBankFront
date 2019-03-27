import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './services/auth-service.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppStoreDispatcher } from './store/dispatcher/dispatcher.store';
import { reducers } from './store/reducers/app.reducer'
import { environment } from '../environments/environment';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MaskCreditCardPipe } from './pipes/cc-mask.pipe';
import { RegistrationSuccessComponent } from './components/registration-success/registration-success.component';
import { AppEffects } from './store/effects/app.effects';
import { RegistrationService } from './services/registration.service';
import { DashboardService } from './services/dashboard.service';
import { RoutingStateService } from './services/router-state.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    MaskCreditCardPipe,
    RegistrationSuccessComponent,

  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forRoot([AppEffects]),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login' }
    ], {
        onSameUrlNavigation: 'reload',
        // enableTracing: true
      }),
    // adds the reducer to the app. Also activates the redux devtools
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule
  ],
  providers: [
    AuthService,
    RegistrationService,
    DashboardService,
    AppStoreDispatcher,
    RoutingStateService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // dictates whether multiple interceptors can be used
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
