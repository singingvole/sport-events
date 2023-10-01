export interface SportEvent {
  id: string;
  name: string;
  sport: string;
  status: SportEventsStatus;
  startTime: string;
  finishTime: string;
}

export enum SportEventsStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Finished = 'Finished',
}
