import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseComponent } from './lease.component';
import { PaymentsComponent } from '../payments/payments.component';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { LeaseService } from '../../../shared/index';
import { LeaseServiceStub } from '../../../testing/lease.service-stub';
import { Observable, of } from 'rxjs';

describe('LeaseComponent', () => {
  let component: LeaseComponent;
  let fixture: ComponentFixture<LeaseComponent>;
  //const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaseComponent, PaymentsComponent ],
      providers:[
        LeaseComponent,
         { provide: ActivatedRoute,  
          useValue: {
            get: () => {
              return 10;
              },
            data: {
                subscribe: (fn: (value) => void) => fn({
                    company: '',
                }),
            },
            params: {
                subscribe: (fn: (value) => void) => fn({
                    tab: 0,
                }),
                get: () => {
                  return 10;
                  },
            },
            paramMap: of({
              get: () => {
              return 10;
              }
            }),
            snapshot: {
                url: [
                    {
                        path: 'foo',
                    },
                    {
                        path: 'bar',
                    },
                    {
                        path: 'baz',
                    },
                    
                ],
                paramMap: of({
                  get: () => {
                  return 10;
                  }
                }),
            },
        },
        },
        {provide:HttpClient, useValue:httpClientSpy},
        // {provide:LeaseService, useClass:leaseServiceStub},
     ],
    })
    .overrideComponent(LeaseComponent, {
      set: {
        providers: [
          //  { provide: ActivatedRoute,  useClass: ActivatedRouteStub },
          { provide: LeaseService, useClass: LeaseServiceStub }
        ]
      },
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
