import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SportEventsHttpClientService } from '~/shared/services/sport-events-http-client.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  const sportEventsHttpClientServiceMock = {
    createEvent: () => of({}),
  };

  const snackBarMock = {
    open: () => ({
      onAction: () => of({}),
    }),
  };

  const routerMock = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    navigate: () => {},
  };

  const activatedRouteMock: Partial<ActivatedRoute> = {};

  const eventFormMock = {
    valid: () => {
      return true;
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        SportEventsHttpClientService,
        { provide: SportEventsHttpClientService, useValue: sportEventsHttpClientServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    });
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should show a snackbar when form is invalid', () => {
    spyOn(snackBarMock, 'open').and.returnValue({
      onAction: () => of({}),
    });
    component.onSubmit();
    expect(snackBarMock.open).toHaveBeenCalled();
  });

  it('should call createEvent and navigate when form is valid', () => {
    spyOn(sportEventsHttpClientServiceMock, 'createEvent').and.returnValue(of({}));

    spyOn(snackBarMock, 'open').and.returnValue({
      onAction: () => of({}),
    });

    spyOn(routerMock, 'navigate');

    component.eventForm = eventFormMock as never;

    component.onSubmit();

    expect(sportEventsHttpClientServiceMock.createEvent).toHaveBeenCalled();
    expect(snackBarMock.open).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalled();
  });
});
