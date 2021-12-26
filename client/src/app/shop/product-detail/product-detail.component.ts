import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/core/models/product';
import { ShopService } from '../shop.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product:IProduct;
  quantity = 1;

  constructor(private shopService:ShopService,
                private activedRoute: ActivatedRoute,
                private breadcrumbService: BreadcrumbService,
                private basketServicce: BasketService) {
  
   }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    this.shopService.getProduct(+this.activedRoute.snapshot.params.id).subscribe(res=>{
      this.product = res;
      this.breadcrumbService.set('@productDetails',this.product.name)
    },error=>{
      console.log(error);
    })
  }

  incrementQuantity(){
    this.quantity++;
  }

  decrementQuantity(){
    if(this.quantity > 1){
      this.quantity--;
    }
  }

  productAddToCart(){
    this.basketServicce.addToCart(this.product,this.quantity);
  }

}
