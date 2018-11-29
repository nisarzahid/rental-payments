import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaseService } from '../../../shared/index';
import { Tenant } from '../../../models/index';
import { HelperService } from '../../../core/index';

@Component({
  selector: 'app-lease-list',
  templateUrl: './lease-list.component.html',
  styleUrls: ['./lease-list.component.css']
})
export class LeaseListComponent implements OnInit {
  leases:Tenant[];
  

  constructor(private router: Router,private leaseService:LeaseService,private helperService:HelperService) { }

  ngOnInit() {
    this.leaseService.getLeases().subscribe((results:Tenant[]) =>{
      this.leases = results;
      this.helperService.cachedLeases = this.leases; //save leases for cache or check for route validation
    });
  }

  //Navigate to Lease Detail Page
  getLeaseDetails(lease:Tenant){
    this.helperService.currentTenant = lease.tenant;//Data Service to share data between components
    this.router.navigate(['/leases', lease.id ]);
  }
}
