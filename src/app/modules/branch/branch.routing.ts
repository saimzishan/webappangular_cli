import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { BranchViewComponent } from './components/branch-view.component';
import { BranchAdminComponent } from './components/branch-admin.component';
import { PartialBranchComponent } from './components/partial-branch.component';


 //import { ModalComponent } from '../../modal.component';

const routes: Routes = [
    { path: 'branch', children: [
        { path: 'admin', component: BranchAdminComponent, canActivate: [AuthGuard], data:{roles: ['2']} },
        { path: 'home', component: BranchViewComponent, canActivate: [AuthGuard], data:{roles: ['2']}},
        
      ]
    },
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(routes),
    ],
    exports: [RouterModule],
    providers: [AuthGuard]
  })
export class BranchRoutingModule { }
export const branchRoutedComponents = [BranchAdminComponent, BranchViewComponent, PartialBranchComponent
];
