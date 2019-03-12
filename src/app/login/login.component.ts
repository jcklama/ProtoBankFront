import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import ResizeObserver from 'resize-observer-polyfill'
import { AuthService } from '../services/auth-service.service';
import { HttpParams } from '../../../node_modules/@angular/common/http';
import { AppStoreDispatcher } from '../dispatcher/dispatcher.store';
// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private dispatcher: AppStoreDispatcher
  ) { }

  loginForm: FormGroup;
  @ViewChild('wrapper') wrapper: ElementRef;

  ngOnInit() {
    const ro = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        const { left, top, width, height } = entry.contentRect;
        console.log('Element:', entry.target);
        console.log(`Element's size: ${width}px x ${height}px`);
        console.log(`Element's paddings: ${top}px ; ${left}px`);
      }
    });
    ro.observe(this.wrapper.nativeElement);

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    const test = { a: "hi", b: "bye" }
    // const testAssign = Object.assign({}, test, { b: "one", c: "two" })
    const test2 = { b: "two", c: "three" }
    const testAssign = { ...test, ...test2 }
    console.log(testAssign);
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.router.navigateByUrl('/registration');
    }
    console.log('submitted!');
    const loginInfo = { username: this.username.value, password: this.password.value };

    this.dispatcher.setAuthInfo(loginInfo);
    this.authService.login(loginInfo)
      // .map((resp: Response) => resp.json())
      .subscribe(
        resp => { console.log(resp); },
        err => { console.log(err); }
      )
  }

}
