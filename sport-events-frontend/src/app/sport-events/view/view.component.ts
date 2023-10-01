import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sports, Statuses } from '~/sport-events/sport-events.const';
import { FormControl } from '@angular/forms';
import { LoadingAnimationService } from '~/shared/services/loading-animation.service';
import { SportEventsRoutes } from '~/sport-events/sport-events-routing.module';
import { SportEventsHttpClientService } from '~/shared/services/sport-events-http-client.service';
import { tap } from 'rxjs';
import { SportEvent } from '~/sport-events/sport-event.types';
import { MatSelectChange } from '@angular/material/select';

@Component({
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements AfterViewInit {
  SportEventsRoutes = SportEventsRoutes;

  columns = [
    {
      columnDef: 'name',
      header: 'Name',
      sort: false,
      cell: (column: SportEvent) => `${column.name}`,
    },
    {
      columnDef: 'sport',
      header: 'Sport',
      sort: false,
      cell: (column: SportEvent) => `${column.sport}`,
    },
    {
      columnDef: 'status',
      header: 'Status',
      sort: false,
      cell: (column: SportEvent) => `${column.status}`,
    },
    {
      columnDef: 'startTime',
      header: 'Start time',
      sort: true,
      cell: (column: SportEvent) => `${new Date(column.startTime).toLocaleString()}`,
    },
    {
      columnDef: 'finishTime',
      header: 'Finish time',
      sort: true,
      cell: (column: SportEvent) => `${new Date(column.finishTime).toLocaleString()}`,
    },
  ];
  sportsList: string[] = Sports;
  statusesList: string[] = Statuses;
  sports = new FormControl('');
  statuses = new FormControl('');
  selectedSports: string[] = [];
  selectedStatuses: string[] = [];
  currentNameFilter = '';

  displayedColumns: string[] = this.columns.map(c => c.columnDef);
  displayedColumnsWithActions: string[] = [...this.displayedColumns, 'actions'];
  dataSource: MatTableDataSource<SportEvent> = new MatTableDataSource(undefined);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private loadingAnimationService: LoadingAnimationService,
    private sportEventsHttpClientService: SportEventsHttpClientService
  ) {
    this.loadingAnimationService.startLoadingAnimation();
  }

  ngAfterViewInit() {
    this.getTableData();
  }

  applyNameFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (filterValue.length < 3) {
      filterValue = '';
    }
    this.currentNameFilter = filterValue;
    this.triggerFilterUpdate();
  }

  applySportFilter(ob: MatSelectChange) {
    this.selectedSports = ob.value;
    this.triggerFilterUpdate();
  }

  applyStatusFilter(ob: MatSelectChange) {
    this.selectedStatuses = ob.value;
    this.triggerFilterUpdate();
  }

  onStatusUpdated(recordToUpdate: SportEvent) {
    const data: SportEvent[] = this.dataSource.data;
    const index: number = data.findIndex((item: SportEvent) => item.id === recordToUpdate.id);
    if (index !== -1) {
      data[index] = recordToUpdate;
      this.dataSource.data = data;
    }
  }

  private triggerFilterUpdate() {
    this.dataSource.filter = 'triggerFilter';
  }

  private getTableData() {
    this.sportEventsHttpClientService
      .getAllEvents()
      .pipe(
        tap((data: SportEvent[]) => {
          this.setupMatTableDataSource(data);
          this.loadingAnimationService.stopLoadingAnimation();
        })
      )
      .subscribe();
  }

  private setupMatTableDataSource(data: SportEvent[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.customFilterPredicate();
    this.dataSource.sortingDataAccessor = this.customSortingDataAccessor();
  }

  private customFilterPredicate(): (data: SportEvent) => boolean {
    return (data: SportEvent): boolean => {
      const searchText: string = this.currentNameFilter.toLowerCase();
      const sportsFilter: boolean = this.selectedSports.length === 0 || this.selectedSports.includes(data.sport);
      const statusFilter: boolean = this.selectedStatuses.length === 0 || this.selectedStatuses.includes(data.status);
      const nameFilter: boolean = data.name.toLowerCase().includes(searchText);
      return sportsFilter && statusFilter && nameFilter;
    };
  }

  private customSortingDataAccessor(): (item: SportEvent, property: string) => number {
    return (item: SportEvent, property: string): number => {
      switch (property) {
        case 'startTime':
          return new Date(item.startTime).getTime();
        case 'finishTime':
          return new Date(item.finishTime).getTime();
        default:
          return 0;
      }
    };
  }
}
