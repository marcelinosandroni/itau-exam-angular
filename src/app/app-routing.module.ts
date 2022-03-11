import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessEditPageComponent } from './modules/business/pages/business-edit-page/business-edit-page.component';
import { BusinessHomePageComponent } from './modules/business/pages/business-home-page/business-home-page.component';

const routes: Routes = [
  {
    path: 'business',
    component: BusinessHomePageComponent,
    pathMatch: 'full',
  },
  { path: 'business/:id', component: BusinessEditPageComponent },
  { path: '', redirectTo: '/business', pathMatch: 'full' },
  { path: '**', redirectTo: '/business' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
