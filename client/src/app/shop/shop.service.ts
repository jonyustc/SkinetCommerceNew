import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../core/models/product';
import { map } from 'rxjs/operators';
import { IPagination } from '../core/models/pagination';
import { IBrand } from '../core/models/productBrand';
import { IProductType } from '../core/models/productType';
import { ProductParams } from '../core/models/productParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:7018/api/';

  constructor(private http: HttpClient) { }

  getProducts(productParams:ProductParams){
    let params = new HttpParams();

    if(productParams.brandId !== 0){
      params = params.append('brandId',productParams.brandId.toString());
    }

    if(productParams.typeId !== 0){
      params = params.append('typeId',productParams.typeId.toString());
    }

    if(productParams.sort)
    {
      params = params.append('sort',productParams.sort);
    }

    if(productParams.search)
    {
      params = params.append('search',productParams.search);
    }

    if(productParams.pageIndex){
      params = params.append('pageIndex',productParams.pageIndex);
    }

    if(productParams.pageSize){
      params = params.append('pageSize',productParams.pageSize);
    }

    return this.http.get<IPagination>(this.baseUrl + 'products',{params:params});
  }

  getProduct(id?:number){
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes(){
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types');
  }
}
