import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PlaceonOrderObj } from 'src/app/interface/placeonOrder';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {
  SalesList:any[]=[];
  isChecked = false;
  constructor(private productService: ProductService,private toastr:ToastrService){}

  PlaceonOrderObj: PlaceonOrderObj = {
    SaleId: 0,
    CustId: 0,
    SaleDate: new Date(),
    TotalInvoiceAmount: 0 ,
    Discount: '',
    PaymentNaration: '',
    DeliveryAddress1: '', 
    DeliveryAddress2: '',
    DeliveryCity: '',
    PinCode: '',
    DeliveryLandMark: ''
  };
  


  onCheckboxClick() {
    this.toastr.success('Order Delivered!');
  }

}
