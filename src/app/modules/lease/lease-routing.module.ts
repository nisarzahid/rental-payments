import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaseListComponent } from './lease-list/lease-list.component';
import { LeaseComponent } from './lease/lease.component';
import { RouteGuard } from '../../core/index';



const routes: Routes = [
  {path:'', redirectTo: '/leases', pathMatch:'full'}, 
  {path:'leases', component: LeaseListComponent},
  {path:'leases/:id', component: LeaseComponent, canActivate: [RouteGuard]},
  // { path: '**', redirectTo: '/leases', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaseRoutingModule { }
