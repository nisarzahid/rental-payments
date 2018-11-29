import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaseService } from './index';

/**
 * Shared Module - Implement features that are specific to particular modules
 * Each Module will have its own instance of SharedModule features
 * Injected only in the Modules that needs them
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers:[
    LeaseService
  ]
})
export class SharedModule { }