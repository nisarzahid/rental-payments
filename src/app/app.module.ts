import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

//Appilication wide modules
import { AppRoutingModule } from './app-routing.module';
import { CoredModule } from './core/index';


import { AppComponent } from './app.component';
import { LeaseModule } from './modules/index';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoredModule,
    LeaseModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
