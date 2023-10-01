import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SportEvent, SportEventsStatus } from '~/sport-events/sport-event.types';
import { SportEventsHttpClientService } from '~/shared/services/sport-events-http-client.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-sport-event-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent {
  constructor(private sportEventsHttpClientService: SportEventsHttpClientService) {}

  @Input() sportEvent!: SportEvent;
  @Output() statusUpdated: EventEmitter<SportEvent> = new EventEmitter();

  get canActivate() {
    return this.sportEvent.status === SportEventsStatus.Inactive;
  }

  get canInactivate() {
    return this.sportEvent.status === SportEventsStatus.Active;
  }

  get canFinish() {
    return this.sportEvent.status === SportEventsStatus.Inactive || this.sportEvent.status === SportEventsStatus.Active;
  }
  onActivateClick() {
    this.updateEventStatus(SportEventsStatus.Active);
  }
  onInactivateClick() {
    this.updateEventStatus(SportEventsStatus.Inactive);
  }
  onFinishClick() {
    this.updateEventStatus(SportEventsStatus.Finished);
  }

  private updateEventStatus(status: SportEventsStatus) {
    this.sportEventsHttpClientService
      .updateEventStatus(this.sportEvent.id, status)
      .pipe(
        tap((res: SportEvent) => {
          this.statusUpdated.emit(res);
        })
      )
      .subscribe();
  }
}
