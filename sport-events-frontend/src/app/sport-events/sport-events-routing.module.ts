import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';

export enum SportEventsRoutes {
  ROOT = 'sport-events',
  VIEW = 'view',
  CREATE = 'create',
}

const routes: Routes = [
  {
    path: SportEventsRoutes.VIEW,
    component: ViewComponent,
  },
  {
    path: SportEventsRoutes.CREATE,
    component: CreateComponent,
  },
  {
    path: '**',
    redirectTo: SportEventsRoutes.VIEW,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SportEventsRoutingModule {}
