import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { BasketService } from './basket/basket.service';
import { IBasket } from './core/models/basket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private basketService:BasketService ) {
    
  }

  ngOnInit(): void {
    let basketId = localStorage.getItem('basket_id');

    if(basketId !== null){
      this.basketService.getBasketItem(basketId).subscribe(()=>{
        console.log("initialized");
      });
    }
  }
}
