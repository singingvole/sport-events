import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsComponent } from './actions.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockSportEvents } from '~/sport-events/sport-events.mock';
import { SportEvent, SportEventsStatus } from '~/sport-events/sport-event.types';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SportEventsHttpClientService } from '~/shared/services/sport-events-http-client.service';
import { Observable, of } from 'rxjs';
import Expected = jasmine.Expected;

describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;
  let sportEventsHttpClientService: SportEventsHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionsComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule],
    });
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    sportEventsHttpClientService = TestBed.inject(SportEventsHttpClientService);
    component.sportEvent = mockSportEvents[0] as SportEvent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true for status Active', () => {
    component.sportEvent = { status: SportEventsStatus.Active } as SportEvent;
    expect(component.canFinish).toBe(true);
  });

  it('should return true for status Inactive', () => {
    component.sportEvent = { status: SportEventsStatus.Inactive } as SportEvent;
    expect(component.canFinish).toBe(true);
  });

  it('should return false for other status values', () => {
    const otherStatuses = [SportEventsStatus.Finished];

    otherStatuses.forEach(status => {
      component.sportEvent = { status } as SportEvent;
      expect(component.canFinish).toBe(false);
    });
  });

  it('should call updateEventStatus and emit statusUpdated event', () => {
    const status: SportEventsStatus = SportEventsStatus.Active;
    spyOn(sportEventsHttpClientService, 'updateEventStatus').and.returnValue(of({ status }) as Observable<SportEvent>);
    const emitSpy = spyOn(component.statusUpdated, 'emit');
    component.sportEvent = {
      id: 'b01ce4d0-3069-4445-b4b5-84ebc134205c',
      name: 'Concert in Zurich',
      sport: 'Basketball',
      status: SportEventsStatus.Inactive,
      startTime: '2023-10-02T05:53:20.565Z',
      finishTime: '2025-06-14T18:01:19.060Z',
    };
    component['updateEventStatus'](status);
    expect(sportEventsHttpClientService.updateEventStatus).toHaveBeenCalledWith('b01ce4d0-3069-4445-b4b5-84ebc134205c', status);
    expect(emitSpy).toHaveBeenCalledWith({ status } as Expected<SportEvent | undefined>);
  });
});
