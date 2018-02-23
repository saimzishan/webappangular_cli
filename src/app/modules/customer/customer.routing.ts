import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { CustomerComponent } from './components/customer.component';
import { CustomerViewComponent } from './components/customer-view.component';
import { PartialCustomerComponent } from './components/partial-customer.component';

const routes: Routes = [
  { path: 'customer', children: [
      { path: 'home', component:CustomerComponent, canActivate: [AuthGuard], data:{roles: ['4']} },
      { path: 'assign', component: CustomerViewComponent, canActivate: [AuthGuard], data:{roles: ['4']} }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class customerRoutingModule { }

export const  CustomerRoutedComponents = [CustomerComponent, CustomerViewComponent, PartialCustomerComponent];
