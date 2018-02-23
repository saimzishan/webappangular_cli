import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';

import { VersionComponent } from './components/version.component'; 

const routes: Routes = [
 
    { path: 'version', component: VersionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule] 
})
export class VersionRoutingModule { }

export const VersionRoutedComponents = [VersionComponent];