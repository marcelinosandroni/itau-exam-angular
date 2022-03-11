import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LanguageComponent } from './language/language.component';
import { MenuComponent } from './menu/menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    HeaderComponent,
    LanguageComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
  ],
  exports: [
    HeaderComponent,
    LanguageComponent,
    MenuComponent
  ]
})
export class CoreModule { }
