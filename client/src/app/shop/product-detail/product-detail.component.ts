import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/core/models/product';
import { ShopService } from '../shop.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product:IProduct;

  constructor(private shopService:ShopService,private activedRoute: ActivatedRoute,private breadcrumbService: BreadcrumbService) {
  
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

}
