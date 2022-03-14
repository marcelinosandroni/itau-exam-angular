import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusinessModule } from './modules/business/business.module';
import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';
import { ENVIRONMENT, getEnvironment } from 'src/environments/environment.provider';
import { SharedModule } from './shared/shared.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    CoreModule,
    BusinessModule,
  ],
  providers: [
    { provide: ENVIRONMENT, useFactory: getEnvironment }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
