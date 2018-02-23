import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../guard/auth.guard';

// import { CompanyComponent } from './components/company.component';
import { CompanyViewComponent } from './components/company-view.component';
import { PartialCompanyComponent } from './components/partial-company.component';
// import { CompanyTypeComponent } from './components/company-type.component';
//import { ModalComponent } from '../../modal.component';

export const routes: Routes = [
  { path: 'company', children: [
      { path: 'view', component: CompanyViewComponent, canActivate: [AuthGuard], data:{roles: ['18']} }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class CompanyRoutingModule { }

export const companyRoutedComponents = [/*CompanyComponent,*/ CompanyViewComponent,PartialCompanyComponent];