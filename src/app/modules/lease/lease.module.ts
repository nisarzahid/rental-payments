import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaseRoutingModule } from './lease-routing.module';
import { LeaseListComponent } from './lease-list/lease-list.component';
import { SharedModule } from '../../shared/shared.module';
import { LeaseComponent } from './lease/lease.component';
import { PaymentsComponent } from './payments/payments.component';

@NgModule({
  declarations: [LeaseListComponent, LeaseComponent, PaymentsComponent],
  imports: [
    CommonModule,
    LeaseRoutingModule,
    SharedModule
  ],
  providers:[]
})
export class LeaseModule { }
