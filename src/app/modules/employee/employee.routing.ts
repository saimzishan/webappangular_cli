import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { EmployeeComponent } from './components/employee.component';
import { EmployeeViewComponent } from './components/employee-view.component';
import { PartialEmployeeComponent } from './components/partial-employee.component';
import { EmployeeTimeComponent } from './components/employee-timing.component';

const routes: Routes = [
  { path: 'employee', children: [
      { path: 'home', component:EmployeeComponent, canActivate: [AuthGuard], data:{roles: ['2']} },
      { path: 'assign', component: EmployeeViewComponent, canActivate: [AuthGuard], data:{roles: ['4']} },
      { path: 'availTiming', component: EmployeeTimeComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class employeeRoutingModule { }

export const employeeRoutedComponents = [EmployeeComponent, EmployeeViewComponent, PartialEmployeeComponent, EmployeeTimeComponent];
