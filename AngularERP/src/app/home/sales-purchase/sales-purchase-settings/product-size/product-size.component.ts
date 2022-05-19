import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-size',
  templateUrl: './product-size.component.html',
  styleUrls: ['./product-size.component.scss']
})
export class ProductSizeComponent implements OnInit {
  title:string="Add Thickness";
  title1:string="Product Thickness";
  lbl:string="Thickness";
  constructor() { }

  ngOnInit() {
  }

}
