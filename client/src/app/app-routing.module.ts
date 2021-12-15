import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './core/components/error/error.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { ServerErrorComponent } from './core/components/server-error/server-error.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './shop/product-detail/product-detail.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m=>m.ShopModule) },
  { path: 'error', component: ErrorComponent},
  { path: 'server-error', component: ServerErrorComponent},
  { path: 'notfound', component: NotFoundComponent},
  { path: '**', redirectTo: '', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
