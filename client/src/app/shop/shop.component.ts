import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IPagination } from '../core/models/pagination';
import { IProduct } from '../core/models/product';
import { IBrand } from '../core/models/productBrand';
import { ProductParams } from '../core/models/productParams';
import { IProductType } from '../core/models/productType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm:ElementRef;
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IProductType[] =[];
  selectedBrandId = 0;
  selectedTypeId = 0;
  sortBySelected='name';
  productParams:ProductParams=new ProductParams();
  sortValues = [
    { name:'Sort By Name',value:'name' },
    { name:'Price Low to High', value:'priceAsc'},
    { name:'Price High to Low', value:'priceDesc'},
  ];

  totalItems:number;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {

    this.getProducts();

    this.getBrands();
    this.getTypes();

    

  }

  getBrands(){
    this.shopService.getBrands().subscribe(res => {
      this.brands = [{id : 0,name: 'All'},...res];
    },error =>{
      console.log(error);
    });
  }

  getTypes(){
    this.shopService.getTypes().subscribe(res => {
      this.types =  [{id : 0,name: 'All'},...res];
    },error =>{
      console.log(error);
    });
  }

  getProducts(){
    this.shopService.getProducts(this.productParams).subscribe(res => {
      this.products = res.data;
      this.totalItems = res.total;
      this.productParams.pageIndex = res.pageIndex;
      this.productParams.pageSize = res.pageSize;
    },error =>{
      console.log(error);
    });
  }

  onSelectedBrand(brandId:number){
    this.productParams.brandId = brandId;
    this.productParams.pageIndex = 1;
    this.getProducts();
  }

  onSelectedType(typeId:number){
    this.productParams.typeId = typeId;
    this.productParams.pageIndex = 1;
    this.getProducts();
  }

  onSelectedChanged(event:any){
    this.productParams.sort = event.target.value;
    this.getProducts();
  }

  onSearched(){
    console.log(this.searchTerm);
    console.log(this.searchTerm.nativeElement.value);
    this.productParams.search = this.searchTerm.nativeElement.value;
    this.productParams.pageIndex = 1;
    this.getProducts();
  }

  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.productParams = new ProductParams();
    this.getProducts();
  }

  addPageEvent(event:any){
    if(this.productParams.pageIndex !== event){
    this.productParams.pageIndex = event;
    this.getProducts();
    }
  }



}
