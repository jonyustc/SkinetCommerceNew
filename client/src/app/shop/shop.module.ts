import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ShopComponent,
    ProductDetailComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShopRoutingModule,
    SharedModule
  ],
  exports:[ShopComponent,ProductDetailComponent]
})
export class ShopModule { }
