import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit  {
  CustomerList: any[] = [];
  custId:number=0;
  custName:string='';
  phoneNumber:number=0;
  password:string='';



  

  ngOnInit(): void {
    this.getCustomers();
  }

  constructor(private productService: ProductService) {}

  getCustomers(): void {
    this.productService.getAllCustomers().subscribe(
      (data: any[]) => {
        this.CustomerList = data;
      }, 
      error => {
        console.error("Error fetching categories:", error);
      }
    );
  }



  }


