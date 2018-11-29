import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsComponent } from './payments.component';
import { HttpClient } from '@angular/common/http';
import { LeaseServiceStub  } from '../../../testing/lease.service-stub';
import { LeaseService } from '../../../shared/index';


describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsComponent ],
      providers:[LeaseService, {provide:HttpClient, useValue:httpClientSpy }]
    })
    .overrideComponent(PaymentsComponent, {
      set: {
        providers: [
          { provide: LeaseService, useClass: LeaseServiceStub }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
