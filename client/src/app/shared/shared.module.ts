import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './components/pager/pager.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderSummeryComponent } from './components/order-summery/order-summery.component';



@NgModule({
  declarations: [
    PagerComponent,
    OrderSummeryComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule,
  ],
  exports:[PagerComponent,CarouselModule,OrderSummeryComponent]
})
export class SharedModule { }
