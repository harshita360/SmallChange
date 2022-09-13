import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let mockUserService:any;
  let routerStub:any;

  beforeEach(async () => {

    mockUserService=jasmine.createSpyObj(['authenticateUser'])

    routerStub=jasmine.createSpyObj('router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      providers:[{provide:Router, useValue: routerStub}, FormBuilder,
        {provide: UserServiceService, useValue: mockUserService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successful on correct username and password',fakeAsync(()=>{

    mockUserService.authenticateUser.and.returnValue(of(true))


    expect(component.loginForm.valid).toBeFalsy()
    component.loginForm.get('username')?.setValue('user1@gmail.com')
    component.loginForm.get('password')?.setValue('bymmyPassword')
    expect(component.loginForm.valid).toBeTruthy()
    const button=fixture.debugElement.query(By.css('button')).nativeElement
    button.dispatchEvent(new Event('click'))
    tick()
    expect(mockUserService.authenticateUser).toHaveBeenCalled()
    expect(routerStub.navigate).toHaveBeenCalledOnceWith(['/portfolio'])

  }))


  it('should handle on incorrect username and password',fakeAsync(()=>{

    mockUserService.authenticateUser.and.returnValue(of(false))


    expect(component.loginForm.valid).toBeFalsy()
    component.loginForm.get('username')?.setValue('user1@gmail.com')
    component.loginForm.get('password')?.setValue('bymmyPassword')
    expect(component.loginForm.valid).toBeTruthy()
    const button=fixture.debugElement.query(By.css('button')).nativeElement
    button.dispatchEvent(new Event('click'))
    tick()
    expect(mockUserService.authenticateUser).toHaveBeenCalled()
    expect(routerStub.navigate).not.toHaveBeenCalled()
    fixture.detectChanges()
    const errorMesg=fixture.debugElement.query(By.css('#login-error'))
    expect(errorMesg).toBeTruthy()

  }))
});
