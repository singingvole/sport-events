import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SportEventsRoutes } from '~/sport-events/sport-events-routing.module';
import { Sports, Statuses } from '~/sport-events/sport-events.const';
import { SportEventsHttpClientService } from '~/shared/services/sport-events-http-client.service';
import { SportEvent } from '~/sport-events/sport-event.types';

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  SportEventsRoutes = SportEventsRoutes;
  sportsList: string[] = Sports;
  statusesList: string[] = Statuses;

  eventForm = this.fb.group({
    name: ['', Validators.required, Validators.maxLength(200)],
    sport: ['', Validators.required],
    status: ['', Validators.required],
    startTime: ['', Validators.required],
    finishTime: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sportEventsHttpClientService: SportEventsHttpClientService
  ) {}

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.sportEventsHttpClientService.createEvent(this.eventForm.value as SportEvent).subscribe();
      this.snackBar
        .open('Event saved', 'View all events', {
          duration: 3000,
        })
        .onAction()
        .subscribe(() => {
          this.router.navigate([SportEventsRoutes.VIEW], { relativeTo: this.activatedRoute });
        });
    }

    if (this.eventForm.invalid) {
      this.snackBar.open('Please fill all required fields', undefined, {
        duration: 3000,
      });
    }
  }
}
