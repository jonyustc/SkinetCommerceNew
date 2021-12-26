import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/core/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent implements OnInit {
  @Input() product:IProduct;

  constructor(private basketServicce: BasketService) { }

  ngOnInit(): void {
  }

  productAddToCart(){
    this.basketServicce.addToCart(this.product);
  }

}
