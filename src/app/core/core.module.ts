import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelperService } from './services/helper.service';
import { RouteGuard } from './guards/route.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/**
 * Core Module - Implement features that are application wide and signleton services
 * etc Service like LoggedIn User, Application level varaiable
 * Injected only in the AppModule
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PageNotFoundComponent],
  providers:[
      HelperService,
      RouteGuard,
  ]
})
export class CoredModule { }