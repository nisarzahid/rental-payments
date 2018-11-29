import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseListComponent } from './lease-list.component';
import { LeaseService } from '../../../shared/index';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { Tenant } from '../../../models/tenant';
import { CommonModule } from '@angular/common';
import { LeaseRoutingModule } from '../lease-routing.module';
import { LeaseComponent } from '../lease/lease.component';
import { LeaseServiceStub  } from '../../../testing/lease.service-stub';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LeaseListComponent', () => {
  let component: LeaseListComponent;
  let fixture: ComponentFixture<LeaseListComponent>;
  let httpClientSpy: { get: jasmine.Spy };
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  let leaseSpy:LeaseService; //jasmine.createSpyObj('LeaseService', ['getLeases', 'getLease']);
  const response: Tenant[] = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:[
        LeaseListComponent,
        { provide: Router,  useValue: routerSpy },
        {provide:HttpClient, useValue:httpClientSpy},
        // {provide:LeaseService, useClass:leaseServiceStub},
    ],
    declarations:[LeaseListComponent]
    })  // Override component's own provider
    .overrideComponent(LeaseListComponent, {
      set: {
        providers: [
          { provide: LeaseService, useClass: LeaseServiceStub }
        ]
      }
    })
    .compileComponents();   
      fixture = TestBed.createComponent(LeaseListComponent);
      leaseSpy = fixture.debugElement.injector.get(LeaseService);
      
      component = fixture.componentInstance;
      fixture.detectChanges();
  }));



  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
    component.ngOnInit();
  });


  it('should have <h2> Page Heading with "Leases"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const p = bannerElement.querySelector('h2');
    expect(p.textContent).toEqual('Leases');
  });
  
  it('should find the <p> with fixture.debugElement.query(By.css)', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const paragraphDe = bannerDe.query(By.css('table'));
    const p: HTMLElement = paragraphDe.nativeElement;
    expect(p.tagName).toEqual('TABLE');
  });
});
