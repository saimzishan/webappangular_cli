import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { AppoinmentComponent } from './components/appoinment.component';
import { AppoinmentViewComponent } from './components/appoinment-view.component';
import { PartialAppoinmentComponent } from './components/partial-appoinment.component';
import {AppointmentViewComponent} from '../../components/appointment/appointment-view.component';
import {CalenderComponent} from './components/calender.component';
import {CalenderViewComponent} from './components/calender-view.component';
import {PartialCalenderComponent} from './components/partial-calender.component';

const routes: Routes = [
  { path: 'appointments', canActivate: [AuthGuard], data: {roles: ['2', '4', '18']}, children: [
      { path: 'home', component: AppoinmentComponent },
      { path: 'view', component: AppoinmentViewComponent },
      { path: 'calenderView', component: CalenderComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppoinmentRoutingModule { }

export const appoinmentRoutedComponents = [AppoinmentComponent, AppoinmentViewComponent,
  PartialAppoinmentComponent, CalenderComponent, CalenderViewComponent, PartialCalenderComponent];
