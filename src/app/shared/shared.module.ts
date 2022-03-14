import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoBackDirective } from './directive/go-back.directive';
import { CnpjPipe } from './pipes/cnpj.pipe';
import { CnpjDirective } from './directive/cnpj.directive';
import { CepDirective } from './directive/cep.directive';
import { CepPipe } from './pipes/cep.pipe';
import { DisableControlDirective } from './directive/disable-control.directive';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MatPaginatorModule } from '@angular/material/paginator';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

@NgModule({
  declarations: [GoBackDirective,
    CnpjPipe,
    CnpjDirective,
    CepPipe,
    CepDirective,
    DisableControlDirective,
    PaginationComponent,

  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatPaginatorModule
  ],
  providers: [CnpjPipe, CepPipe],
  exports: [
    GoBackDirective,
    CnpjPipe,
    CnpjDirective,
    CepPipe,
    CepDirective,
    DisableControlDirective,
    TranslateModule,
    PaginationComponent
  ]
})
export class SharedModule { }
