import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/core/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent implements OnInit {
  @Input() product:IProduct;

  constructor() { }

  ngOnInit(): void {
  }

}
