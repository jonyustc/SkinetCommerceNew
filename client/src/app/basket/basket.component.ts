import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, Item } from '../core/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$ = new Observable<IBasket>();

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  incrementBasketItem(item:Item){
    this.basketService.incrementBasketItem(item);
  }

  decrementBasketItem(item:Item){
    this.basketService.decrementBasketItem(item);
  }

  removeBasketItem(item:Item){
    this.basketService.removeBasketItem(item);
  }

}
