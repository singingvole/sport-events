import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportEventsRoutes } from '~/sport-events/sport-events-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: SportEventsRoutes.ROOT,
    pathMatch: 'full',
  },
  {
    path: SportEventsRoutes.ROOT,
    loadChildren: () => import('./sport-events/sport-events.module').then(m => m.SportEventsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
