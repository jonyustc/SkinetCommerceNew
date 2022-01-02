import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './components/pager/pager.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderSummeryComponent } from './components/order-summery/order-summery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './components/text-input/text-input.component';



@NgModule({
  declarations: [
    PagerComponent,
    OrderSummeryComponent,
    TextInputComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  exports:[
    PagerComponent,CarouselModule,OrderSummeryComponent,FormsModule,ReactiveFormsModule,BsDropdownModule,
    TextInputComponent
  ]
})
export class SharedModule { }
