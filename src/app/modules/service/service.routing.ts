import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { ServiceComponent } from './component/service.component';
import { ServiceViewComponent } from './component/service-view.component';
import { PartialServiceComponent } from './component/partial-service.component';
import { DepartmentServiceComponent } from './component/department-service.component'

const routes: Routes = [
  { path: 'service', children: [
      { path: 'home', component: ServiceComponent, canActivate: [AuthGuard], data:{roles: ['2']} },
      { path: 'assign', component: ServiceViewComponent, canActivate: [AuthGuard], data:{roles: ['4']} },
      { path: 'department', component: DepartmentServiceComponent, canActivate: [AuthGuard], data:{roles: ['4']} }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class serviceRoutingModule { }

export const serviceRoutedComponents = [
  ServiceComponent,
  ServiceViewComponent,
  PartialServiceComponent,
  DepartmentServiceComponent
];