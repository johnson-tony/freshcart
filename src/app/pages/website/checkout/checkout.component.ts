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
  const local = localStorage.getItem('CusID') as string;
  this.customerId = parseInt(local);
   this.getCartProductbyCustomerId(this.customerId);
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
    }
  )
}

  remove(cartId: number ) {
    this.productService.removeProductByCartId(cartId).subscribe(
      (res: any) => {
        this.productService.cartUpdated$.next(true);
        this.getCartProductbyCustomerId(this.customerId);
      
      },
      (error) => {
       
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
    if (!this.isValidOrder(PlaceonOrderObj)) {
      this.toastr.error('Please enter valid order information.');
      return;
    }
   PlaceonOrderObj.TotalInvoiceAmount = this.calculateTotal();
    const local = localStorage.getItem('CusID') as string;
    PlaceonOrderObj.CustId = parseInt(local);
    this.productService.PlaceonOrder(PlaceonOrderObj).subscribe({
      next: (res) => {
        if (res) {
          this.toastr.success(' Your order will be delivered soon!');
          this.remove(this.cartList[0].cartId);
          this.productService.cartUpdated$.next(true);
         this.cartList = []; 
          this.router.navigate(['/Allproducts'])
         if(this.cartList.length=0){
          this.router.navigate(['/Allproducts'])
          
         }
        
        
        
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
  isValidOrder(order: any): boolean {
     if (!order.DeliveryCity || !order.PinCode || !order.DeliveryAddress1 || !order.DeliveryLandMark || !order.PaymentNaration) {
      return false;
    }
    return true;
  }
           
}
