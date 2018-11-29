import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { LeaseService } from '../../../shared/index';
import { Lease } from '../../../models/index';
import { HelperService } from '../../../core/index';
import { of } from 'rxjs';

@Component({
  selector: 'app-lease',
  templateUrl: './lease.component.html',
  styleUrls: ['./lease.component.css']
})
export class LeaseComponent implements OnInit {
  payments = []
  lease = new Lease();
  showPayment = false;

  constructor(private route: ActivatedRoute, private leaseService:LeaseService, private helperService:HelperService) { }

  ngOnInit() {
    //get route parameter of lease id
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of(params.get('id'))
      )
    ).subscribe((id) => {
      //get lease detail record from http lease service
      this.leaseService.getLease(id).subscribe((result:Lease) =>{
        this.lease = result;
      });
    });
    

  }

}
