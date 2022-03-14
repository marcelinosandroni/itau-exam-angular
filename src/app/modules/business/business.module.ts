import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessHomePageComponent } from './pages/business-home-page/business-home-page.component';
import { BusinessEditPageComponent } from './pages/business-edit-page/business-edit-page.component';
import { BusinessCreatePageComponent } from './pages/business-create-page/business-create-page.component';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    BusinessHomePageComponent,
    BusinessEditPageComponent,
    BusinessCreatePageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    TranslateModule

  ],
  exports: [
    BusinessHomePageComponent,
    BusinessEditPageComponent,
    BusinessCreatePageComponent,
  ]
})
export class BusinessModule { }
