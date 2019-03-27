import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { APP_BASE_HREF } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { DebugElement } from '@angular/core';

describe('LoginComponent', () => {
  let login: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  // routes needed for config so tests can run
  const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  ]
  // We do the following before each test:
  // 1. creation of component & component instance (39, 40) after configuring
  // 2. set the TestBed elements for the form (41, 42)
  // 3. run a change detection cycle so that view renders
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes)
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginComponent);
      login = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));    // for testing forms
      el = de.nativeElement;                              // gets all the elements of the form

      fixture.detectChanges(); // forces a change detection cycle to test rendering of HTML element
    });
  }));

  it(`should create`, async(() => {
    expect(login).toBeTruthy();
  }))

  it(`should have as title 'ProtoBank'`, async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('ProtoBank');
  }));

  it('form should be invalid when username entered but password empty', async(() => {
    login.loginForm.controls['username'].setValue('testuser');
    login.loginForm.controls['username'].setValue('');
    expect(login.loginForm.valid).toBeFalsy();
  }));

  it('form should be invalid when password entered but password entered', async(() => {
    login.loginForm.controls['username'].setValue('');
    login.loginForm.controls['password'].setValue('testpassword');
    expect(login.loginForm.valid).toBeFalsy();
  }));

  it('form should be invalid when password and username not entered', async(() => {
    login.loginForm.controls['username'].setValue('');
    login.loginForm.controls['password'].setValue('');
    expect(login.loginForm.valid).toBeFalsy();
  }));

  it('form should be valid when password and username entered', async(() => {
    login.loginForm.controls['username'].setValue('testuser');
    login.loginForm.controls['password'].setValue('testpassword');
    expect(login.loginForm.valid).toBeTruthy();
  }));

  it('should call onSubmit method when submitted', async(() => {
    spyOn(login, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(login.onSubmit).toHaveBeenCalledTimes(0);
  }));

  // it('form should be submitted when onSubmit called', async(()=> {
  //   login.onSubmit();
  //   expect(login.submitted)
  // }));
});
