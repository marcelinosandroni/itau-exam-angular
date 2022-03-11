import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BusinessModule } from './modules/business/business.module';
import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';
import { GoBackDirective } from './shared/directive/go-back.directive';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NoopAnimationsModule,
    CoreModule,
    BusinessModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
