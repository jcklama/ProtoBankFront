import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { AppStoreDispatcher } from '../../store/dispatcher/dispatcher.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private dispatcher: AppStoreDispatcher
  ) { }
  loginForm: FormGroup;
  pending: boolean;
  error: boolean;
  places: string[] = ["Kathmandu", "Reykjavík", "Jakarta", "Chengdu", "Cusco", "Mbombela"]
  previousPlace: string;
  place: string;
  updateIntervalId: number;
  inputControlClicked: boolean = false;
  @ViewChild('wrapper') wrapper: ElementRef;

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.place = this.updatePlace();
    // can also use: this.updateIntervalId = <any>setInterval(() => {
    this.updateIntervalId = window.setInterval(() => {
      this.previousPlace = this.place;
      this.place = this.updatePlace();
      while (this.previousPlace === this.place) {
        this.place = this.updatePlace();
      }
    }, 2000)

    // if previous is the same, update again

    // spread operator example
    // const test = { a: "hi", b: "bye" }
    // const test2 = { b: "two", c: "three" }
    // const testAssign = { ...test, ...test2 }
    // console.log(testAssign);
  }

  ngOnDestroy() {
    if (this.updateIntervalId) {
      clearInterval(this.updateIntervalId);
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.dispatcher.resetErrorState();
    const formValue = this.loginForm.value;
    if (formValue.username && formValue.password) {
      const loginInfo = {
        username: formValue.username,
        password: formValue.password
      }
      this.dispatcher.setAuthInfo(loginInfo);
      this.dispatcher.getPendingState().subscribe(resp => {
        this.pending = resp;
      })
      this.dispatcher.getErrorState().subscribe(resp => {
        this.error = resp;
        if (!resp) {
          this.router.navigate(['/dashboard']);
        }
      })
    }
  }

  register() {
    this.router.navigate(['/registration']);
  }

  updatePlace() {
    const i = Math.floor(Math.random() * this.places.length);
    return this.places[i];
  }

  inputClicked() {
    this.error = false;
  }

}
