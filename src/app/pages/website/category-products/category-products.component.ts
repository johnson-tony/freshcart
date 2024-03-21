import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/services/product/product.service';
import { RegisterObj } from 'src/app/interface/register';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {
  products: any[] = [];
  activateCategoryId: number = 0;
  
 
  ProductList: Product[] = [];

  constructor(private activatedRoute: ActivatedRoute, 
    private productService: ProductService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      
      this.activateCategoryId = params.id;
      this.loadProducts();
      this.localStorageId = localStorage.getItem('CusID') as string;
    this.intValue = parseInt(this.localStorageId);
    });
  }

  loadProducts(): void {
    this.productService.getProductsByCategoryId( this.activateCategoryId).subscribe({
      next: (res) => {
        this.products = res; // Assuming the response contains a 'data' property with the products
      },
      error: (error) => {
        console.error('Error loading products:', error);
        // You can handle the error here, for example, show a toast message using ToastrService
      }
    });
  }
  registerObj: RegisterObj = {
    custId: 0,
    custName: '',
    phoneNumber:0,
    password: ''
};
customerId:number=0;
localStorageId:string='';
intValue:number=0;
cusid = this.intValue;
   addToCart(productId: number, quantity: any) {
    this.localStorageId = localStorage.getItem('CusID') as string;
    this.customerId=this.registerObj.custId;
    const addToCardObj = {
      "cartId": 0,
      "custId": this.intValue ? this.intValue:0,
      "productId": productId,
      "quantity": quantity,
      "addedDate": new Date()
    };
  if(this.localStorageId == null ){
      this.toastr.warning("Please Login");
    }
    else{
    this.productService.addToCart(addToCardObj).subscribe({
      next: (res) => {
        if (res) {
          this.toastr.success('Product added to cart');
          this.productService.cartUpdated$?.next(true);
        } else {
          this.toastr.warning(res.message);
        }
      },
      error: (error) => {
        console.error('Error adding product to cart:', error);
        // Handle error here
      }
    });
  }
}

  getQuantity(product: any): number {
    return product.quantity || 1;
  }


  
  increment(product: any) {
    if (!product.quantity) {
      product.quantity = 1;
    } else {
      product.quantity++;
    }
  }

  decrementQuantity(product: any) {
    if (product.quantity && product.quantity > 1) {
      product.quantity--;
    }
  }
}
