import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { LeaseService } from '../../../shared/index';
import { Lease } from '../../../models/lease';
import { HelperService } from '../../../core/index';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  payments = []
  @Input() lease = new Lease();

  constructor(private leaseService:LeaseService) { }

  ngOnInit() {
    const id = this.lease.id;
    this.leaseService.getLease(id).subscribe((result:Lease) =>{
      this.lease = result;
     
      this.payments = this.leaseService.generatePayments(this.lease);
    });
  }

}
