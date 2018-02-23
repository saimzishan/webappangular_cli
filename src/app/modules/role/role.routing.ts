import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { RoleComponent } from './components/role.component';
import { RoleViewComponent } from './components/role-view.component';
import { PartialRoleComponent } from './components/partial-role.component';

const routes: Routes = [
  { path: 'roles', canActivate: [AuthGuard], data:{roles: ['18']}, children: [
      { path: '', component: RoleComponent },
      { path: 'view', component: RoleViewComponent },
    
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class roleRoutingModule { }

export const roleRoutedComponents = [RoleComponent, RoleViewComponent,PartialRoleComponent];