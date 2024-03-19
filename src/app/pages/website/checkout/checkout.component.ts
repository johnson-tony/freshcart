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
  total:number=0;
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
         
        }
      }
    )
  }

  remove(cartId: number ) {
    this.productService.removeProductByCartId(cartId).subscribe(
      (res: any) => {
        this.productService.cartUpdated$.next(true);
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

  placeOrder(PlaceonOrderObj: any): void {
    // Perform validation
    if (!this.isValidOrder(PlaceonOrderObj)) {
      this.toastr.error('Please enter valid order information.');
      return;
    }
  
    // Calculate total invoice amount
    PlaceonOrderObj.TotalInvoiceAmount = this.calculateTotal();
  
    // Get customer ID from local storage
    const local = localStorage.getItem('CusID') as string;
    PlaceonOrderObj.CustId = parseInt(local);
  
    // Call the PlaceonOrder API
    this.productService.PlaceonOrder(PlaceonOrderObj).subscribe({
      next: (res) => {
        if (res) {
          this.toastr.success('Order placed successfully! Your order will be delivered soon.');
          const cartIdToRemove = this.cartList; // Replace 123 with the actual cartId to remove
            
         
          this.productService.cartUpdated$.next(true);
          
          this.cartList = []; // Clear cart list after placing the order
          this.router.navigateByUrl('AllProducts'); // Navigate to AllProducts page
        } else {
          this.toastr.warning('Failed to place order. Please try again later.');
        }
      },
      error: (error) => {
        console.error('Error placing order:', error);
        this.toastr.error('Failed to place order. Please enter valid information.');
      }
    });
  }
  
  // Function to validate order information
  isValidOrder(order: any): boolean {
    // Perform your validation logic here
    // For example, check if required fields are filled out
    if (!order.DeliveryCity || !order.PinCode || !order.DeliveryAddress1 || !order.DeliveryLandMark || !order.PaymentNaration) {
      return false;
    }
    // Add more validation rules if necessary
    return true;
  }
  

}
