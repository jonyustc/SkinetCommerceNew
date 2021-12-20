import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { HeaderComponent } from './components/header/header.component';

import { BreadcrumbModule } from 'xng-breadcrumb';




@NgModule({
  declarations: [
    NavBarComponent,
    ErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule
  ],
  exports:[NavBarComponent,HeaderComponent,BreadcrumbModule]
})
export class CoreModule { }
