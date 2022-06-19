import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser'
import { HomeComponent } from './home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports:[
        BrowserAnimationsModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get validation error Name min 3 characters', () => {

    component.ngOnInit()

    let nameInput = fixture.debugElement.query(By.css('#name'));
    nameInput.nativeElement.value = "BR";
    nameInput.nativeElement.dispatchEvent(new Event('input'));

    let btn = fixture.debugElement.query(By.css('#registerBtn'))
    btn.nativeElement.click()

    fixture.detectChanges();
    let error = fixture.debugElement.query(By.css('mat-error'));
    expect(error.nativeElement.textContent).toContain("must be at least 3 characters")

  })

  it('should get validation error Name max 10 characters', () => {

    component.ngOnInit()

    let nameInput = fixture.debugElement.query(By.css('#name'));
    nameInput.nativeElement.value = "The planet of humans";
    nameInput.nativeElement.dispatchEvent(new Event('input'));

    let btn = fixture.debugElement.query(By.css('#registerBtn'))
    btn.nativeElement.click()

    fixture.detectChanges();
    let error = fixture.debugElement.query(By.css('mat-error'));
    expect(error.nativeElement.textContent).toContain("maximum of 10 characters")

  })
});
