import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { IBasket } from './core/models/basket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private basketService:BasketService, private accountService:AccountService ) {
    
  }

  ngOnInit(): void {
    this.loadBasket();
    this.loadUser();
  }

  loadUser(){
    let token = localStorage.getItem('token');
      this.accountService.loadCurrentUser(token).subscribe((res)=> {
        console.log('load user',res);
      },error => {
        console.log(error);
      })
  }

  loadBasket(): void{
    let basketId = localStorage.getItem('basket_id');

    if(basketId !== null){
      this.basketService.getBasketItem(basketId).subscribe(()=>{
        console.log("initialized");
      });
    }
  }
}
