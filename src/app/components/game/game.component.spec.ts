import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { By } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service'

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  let userServiceSpy:any;

  beforeEach(async () => {

    userServiceSpy = jasmine.createSpyObj('UserService',['getCurrent','update'])
    await TestBed.configureTestingModule({
      declarations: [ GameComponent ],
      imports:[
        BrowserAnimationsModule,
        RouterTestingModule,
        FlexLayoutModule,
        MatButtonModule,
        MatToolbarModule
      ],
      providers:[ { provide: Router, useValue: routerSpy },
                  { provide: UserService, useValue: userServiceSpy } 
                ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    userServiceSpy.getCurrent.and.returnValue({ name: "Robert", score:0, hightScore: 0 })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should should go out', () => {
    let btn = fixture.debugElement.query(By.css('#btnExit'))
    btn.nativeElement.click()
    expect (routerSpy.navigate).toHaveBeenCalledWith(['./home']);

  })

  it('should increase the score', () => {
    component.user.score = 45
    component.trafficLightColor = "green"
    let btn = fixture.debugElement.query(By.css('#leftBtn'))
    btn.nativeElement.click()
    fixture.detectChanges();
    expect (component.currentStep).toEqual("L")
    expect (component.user.score).toEqual(46)

  })

  it('should decrease the score, red light', () => {
    component.user.score = 78
    component.trafficLightColor = "red"
    let btn = fixture.debugElement.query(By.css('#rightBtn'))
    btn.nativeElement.click()
    fixture.detectChanges();
    expect (component.currentStep).toEqual("R")
    expect (component.user.score).toEqual(77)

  })

  it('should decrease the score, same steps', () => {
    component.user.score = 36
    component.trafficLightColor = "green"
    let btn = fixture.debugElement.query(By.css('#leftBtn'))
    btn.nativeElement.click()
    expect (component.user.score).toEqual(37)
    btn.nativeElement.click()
    expect (component.user.score).toEqual(36)
    btn.nativeElement.click()
    expect (component.user.score).toEqual(35)
    fixture.detectChanges();
    expect (component.currentStep).toEqual("L")

  })

});
