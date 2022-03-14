import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LanguageComponent } from './language/language.component';
import { MenuComponent } from './menu/menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { getEnvironment } from 'src/environments/environment.provider';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './mock/in-memory-data.service';
import { SharedModule } from '../shared/shared.module';

// Use mocked api if config in development environment is set
const environment = getEnvironment()
const devModules = environment.useInMemoryData ? [
  HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, {
    dataEncapsulation: false,
    delay: environment.inMemoryDataDelay
  }
  )
] : []


@NgModule({
  declarations: [
    HeaderComponent,
    LanguageComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    ...devModules
  ],
  exports: [
    HeaderComponent,
    LanguageComponent,
    MenuComponent
  ]
})
export class CoreModule { }
