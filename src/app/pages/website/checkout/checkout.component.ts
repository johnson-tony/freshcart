import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaceonOrderObj } from 'src/app/interface/placeonOrder';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
  cartList: any[] = [];
  

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    const local = localStorage.getItem('CusID') as string;
  this.customerId = parseInt(local);
    this.getCartProductbyCustomerId(this.customerId);
  }
  total:number=0
 customerId:number=0;
 PlaceonOrderObj: PlaceonOrderObj = {
  SaleId: 0,
  CustId: this.customerId,
  SaleDate: new Date(),
  TotalInvoiceAmount: this.total ,
  Discount: '',
  PaymentNaration: '',
  DeliveryAddress1: '', 
  DeliveryAddress2: '',
  DeliveryCity: '',
  PinCode: '',
  DeliveryLandMark: ''
};

  placeOrder(): void {
    //const local = localStorage.getItem('CusID') as string;
    //this.customerId = parseInt(local);
   // this.productService.PlaceonOrder(this.PlaceonOrderObj).subscribe({
    //  next: (res) => {
       // if (res) {
          alert('Order placed successfully!');
          
          
          // Optionally, navigate to a different page or clear the cart
      //  } else {
      //    alert('Failed to place order. Please try again later.');
      //  }
     // },
    //  error: (error) => {
      //  console.error('Error placing order:', error);
     //   alert('Failed to place order. Please try again later.');
   //   }
   // });
 }

  getCartProductbyCustomerId(custId: number){
    this.productService.getCartDataByCustomerId(custId).subscribe(
      (data:any[])=>{
        this.cartList=data;
      }
    )
  }

  

  calculateTotal(): number {
    this.total = 0;
    for (const item of this.cartList) {
      this.total += (item.price * item.quantity);
    }
    return this.total;
  }
}
