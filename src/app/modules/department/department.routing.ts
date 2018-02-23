import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { DepartmentComponent } from './components/department.component';
import { DepartmentViewComponent } from './components/department-view.component';
import { PartialDepartmentComponent } from './components/partial-department.component';

const routes: Routes = [
  { path: 'department', children: [
      { path: 'assign', component: DepartmentComponent, canActivate: [AuthGuard], data:{roles: ['4']} },
      { path: 'home', component: DepartmentViewComponent, canActivate: [AuthGuard], data:{roles: ['2']} }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class departmentRoutingModule { }

export const departmentRoutedComponents = [DepartmentComponent, DepartmentViewComponent,PartialDepartmentComponent];