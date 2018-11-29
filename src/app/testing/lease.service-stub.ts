import { Tenant, Lease } from "../models";
import { of } from "rxjs";

/**
 * Mock Service for LeaseService for Running Mock Test
 */
export class LeaseServiceStub {
    getLeases =   jasmine.createSpy('getLease').and.callFake(
      (id) =>  {
        let list = [Tenant];
        return of(list);
      });

      getLease =   jasmine.createSpy('getLease').and.callFake(
        (id) =>  {
          let list = [Lease];
          return of(list);
        });
    
      generatePayments = () =>{
        let payments = [
          {from: 'Thu Aug 09 2018 00:00:00 GMT+1000 (Australian Eastern Standard Time)', to: 'Fri Aug 10 2018 00:00:00 GMT+1000 (Australian Eastern Standard Time)', days: 2, amount: "145.7"},
          {from: 'Sat Aug 11 2018 00:00:00 GMT+1000 (Australian Eastern Standard Time)', to: 'Fri Aug 24 2018 00:00:00 GMT+1000 (Australian Eastern Standard Time)', days: 14, amount: 1020},
          {from: 'Sat Aug 25 2018 00:00:00 GMT+1000 (Australian Eastern Standard Time)', to: 'Fri Sep 07 2018 00:00:00 GMT+1000 (Australian Eastern Standard Time)', days: 14, amount: 1020},
          {from: 'Sat Sep 08 2018 00:00:00 GMT+1000 (Australian Eastern Standard Time)', to: 'Fri Sep 21 2018 00:00:00 GMT+1000 (Australian Eastern Standard Time)', days: 14, amount: 1020},
          {from: 'Sat Sep 22 2018 00:00:00 GMT+1000 (Australian Eastern Standard Time)', to: 'Tue Sep 25 2018 00:00:00 GMT+1000 (Australian Eastern Standard Time)', days: 4, amount: 291.4}
          
        ]      

      return payments;
    }
  }