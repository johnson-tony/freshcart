import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PlaceonOrderObj } from 'src/app/interface/placeonOrder';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
  cartList: any[] = [];
  

  constructor(private productService: ProductService, private router: Router,private toastr: ToastrService) {}

  ngOnInit(): void {
   this.getCartProductbyCustomerId(this.customerId);
   const local = localStorage.getItem('CusID') as string;
   this.customerId = parseInt(local);
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

 

  getCartProductbyCustomerId(custId: number){
    this.productService.getCartDataByCustomerId(custId).subscribe(
      (data:any[])=>{
        this.cartList=data;
        if (!this.cartList|| this.cartList.length === 0) {
          this.router.navigate(['/AllProducts']);
        }
      }
    )
  }

  remove(cartId: number ) {
    this.productService.removeProductByCartId(cartId).subscribe(
      (res: any) => {
       
        this.getCartProductbyCustomerId(this.customerId);
        // Call getCartProductbyCustomerId after successfully removing the product
        
       
      },
      (error) => {
        // Handle error if any
        console.error("Error removing item:", error);
        
      }
    );
  }

 calculateTotal(): number {
    this.total = 0;
    for (const item of this.cartList) {
      this.total += (item.price * item.quantity);
    }
    return this.total;
  }

  placeOrder(PlaceonOrderObj:any): void {
    const local = localStorage.getItem('CusID') as string;
    this.customerId = parseInt(local);
    this.productService.PlaceonOrder(this.PlaceonOrderObj).subscribe({
      next: (res) => {
        debugger;
        if (res) {
       
          this.toastr.success('Order placed successfully!');
          
          
          // Optionally, navigate to a different page or clear the cart
       } else {
         this.toastr.warning('Failed to place order. Please try again later.');
      }
      },
      error: (error) => {
        console.error('Error placing order:', error);
        this.toastr.error('Failed to place order. Please enter valid Information.');
     }
    });
 }

}
