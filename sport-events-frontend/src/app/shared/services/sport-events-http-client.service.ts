import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SportEvent, SportEventsStatus } from '~/sport-events/sport-event.types';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SportEventsHttpClientService {
  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<SportEvent[]> {
    return this.http.get<SportEvent[]>(`${environment.API_URL}/events`);
  }

  createEvent(sportEvent: SportEvent): Observable<SportEvent> {
    return this.http.post<SportEvent>(`${environment.API_URL}/events`, sportEvent);
  }

  updateEventStatus(id: string, status: SportEventsStatus): Observable<SportEvent> {
    return this.http.patch<SportEvent>(`${environment.API_URL}/events/${id}`, {
      status: status,
    });
  }
}
