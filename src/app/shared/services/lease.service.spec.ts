import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LeaseService } from './lease.service';
import { Lease , Tenant} from "../../models/index";
import { environment } from 'src/environments/environment.prod';
import { LeaseServiceStub  } from '../../testing/lease.service-stub';

describe('LeaseService', () => {
let httpClientSpy: HttpClient;//{ get: jasmine.Spy };
let leaseService: LeaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
        providers:[
          LeaseService
      ]
    })    
  });


  it('should be created', () => {
    const service: LeaseService = TestBed.get(LeaseService);

    expect(service).toBeTruthy();
  });


  it('should return expected Tenants',
  inject([HttpTestingController, LeaseService],
    (httpMock: HttpTestingController, service: LeaseService) => {
      // We call the service
      
      service.getLeases().subscribe((data:Tenant[]) => {
        //console.log(data);
        expect(data.length).toBe(3);
        expect(data[0].tenant).toBe('Alex');
        expect(data[2].id).toBe('lease-c');
      });
      // We set the expectations for the HttpClient mock
      const leaseUrl= environment.leaseUrl;
      const req = httpMock.expectOne(leaseUrl);
      expect(req.request.method).toEqual('GET');
      // Then we set the fake data to be returned by the mock
      let leases = [{id:'lease-a', tenant:'Alex' }, {id:'lease-b', tenant:'Jen' }, {id:'lease-c', tenant:'Frankie' }]
      req.flush(leases);
    })
);


it('should return expected Lease of given Id',
inject([HttpTestingController, LeaseService],
  (httpMock: HttpTestingController, service: LeaseService) => {
    // We call the service
    
    service.getLease('lease-a').subscribe((data:Lease) => {
      //console.log(data);
      expect(data.id).toBe('lease-a');
    });
    // We set the expectations for the HttpClient mock
    const leaseUrl = environment.leaseUrl+"lease-a";
    const req = httpMock.expectOne(leaseUrl);
    expect(req.request.method).toEqual('GET');
    // Then we set the fake data to be returned by the mock
    let lease = {id:'lease-a', tenant:'Alex' };
    req.flush(lease);
  })
);

it('#generatePayments should return real value from the real service', () => {
 
  const service: LeaseService = TestBed.get(LeaseService);
  let stubService = new LeaseServiceStub();
  let lease = {
    id:'lease-a',
    start_date: new Date(2018, 7, 9),//new Date('August, 9th 2018'),
    end_date:new Date(2018, 8, 25),//new Date('September, 25th 2018'),
    rent:510,
    frequency:'fortnightly',
    payment_day:'tuesday '
  }
  console.log(service.generatePayments(lease));
  console.log(stubService.generatePayments());
  expect(service.generatePayments(lease).length).toBe(stubService.generatePayments().length);
});

afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
  httpMock.verify();
}));

});
