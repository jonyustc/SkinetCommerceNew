import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { v4 as uuid } from 'uuid';
import { Basket, IBasket, IBasketTotal, Item } from '../core/models/basket';
import { IProduct } from '../core/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null as any);
  basket$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<IBasketTotal>(null as any);
  basketTotal$ = this.basketTotalSource.asObservable();

  quantity = 1;

  constructor(private http: HttpClient) { }

  getBasketItem(basketId:string){
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + basketId)
      .pipe(
        map((res:IBasket)=>{
          this.basketSource.next(res);
          console.log('current basket',this.getCurrentBasket());
          this.calculateTotal();
        })
        );
  }

  getCurrentBasket(){
    return this.basketSource.value;
    //console.log('current basket',this.basketSource.value);
  }

  mapProductItemToBasketItem(product:IProduct,quantity:number){
    return {
        id : product.id,
        productName: product.name,
        price: product.price,
        pictureUrl: product.pictureUrl,
        brand: product.productBrand,
        type: product.productType,
        quantity
      
  };
}

  addToCart(product:IProduct,quantity=1){


    var ItemtoAdd: Item = this.mapProductItemToBasketItem(product,quantity);

    let basket = this.getCurrentBasket() ?? this.createBasket();

    basket.items = this.addorUpdateBasketItem(basket.items,ItemtoAdd,quantity);

    this.setBasket(basket);
   
  }


  addorUpdateBasketItem(items: Item[], ItemtoAdd: Item,quantity:number): Item[] {
    let index = items.findIndex(i=>i.id == ItemtoAdd.id);

      if(index == -1){
        ItemtoAdd.quantity = quantity;
        items.push(ItemtoAdd);
      }
      else{
        items[index].quantity += quantity;
      }

     return items;
  }

  

  createBasket(): Basket {
    let basket = new Basket();
    localStorage.setItem('basket_id',basket.id);
    return basket;
  }

  incrementBasketItem(item:Item){
    let basket = this.getCurrentBasket();

    let index = basket.items.findIndex(i=>i.id == item.id);

    basket.items[index].quantity++;

    this.setBasket(basket);

  }

  decrementBasketItem(item:Item){
    let basket = this.getCurrentBasket();

    let index = basket.items.findIndex(i=>i.id == item.id);

    if(basket.items[index].quantity > 1){
      basket.items[index].quantity--;
      this.setBasket(basket);
    }else{
      this.removeBasketItem(item);
    }
  }



  removeBasketItem(item:Item){
    let basket = this.getCurrentBasket();

    if(basket.items.some(x=>x.id == item.id)){
      basket.items = basket.items.filter(x=>x.id !== item.id);
      
      if(basket.items.length > 0){
        this.setBasket(basket);
      }
      else{
        this.deleteBasket(basket);
      }
    }  

  }

  deleteBasket(basket:IBasket){
    return this.http.delete(this.baseUrl + 'basket?id=' +  basket.id).subscribe(()=>{
      this.basketSource.next(null as any);
      this.basketTotalSource.next(null as any);
      localStorage.removeItem('basket_id');
    },error =>{
      console.log(error);
    });
  }

  setBasket(basket:IBasket){
    return this.http.post<IBasket>(this.baseUrl + 'basket',basket).subscribe((res:IBasket)=>{
      this.basketSource.next(res);
      this.calculateTotal();
    });
  }

  calculateTotal(){
    const basket = this.getCurrentBasket();
   

    let shipping = 0;
    let subtotal = basket.items.reduce((a,b) => (b.price * b.quantity) + a,0);
    let total = shipping+subtotal;

    this.basketTotalSource.next({shipping:shipping,subtotal:subtotal,total:total});
  }


}


