import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './core/components/error/error.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { ServerErrorComponent } from './core/components/server-error/server-error.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './shop/product-detail/product-detail.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  { path: '', component:HomeComponent,data:{breadcrumb:'Home'}},
  { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m=>m.ShopModule),data:{breadcrumb:'Shop'} },
  { path: 'error', component: ErrorComponent,data:{breadcrumb:'Test Errors'}},
  { path: 'server-error', component: ServerErrorComponent,data:{breadcrumb:'Server Error'}},
  { path: 'notfound', component: NotFoundComponent,data:{breadcrumb:'Not Found'}},
  { path: '**', redirectTo: 'notfound', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
