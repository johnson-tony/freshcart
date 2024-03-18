import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/services/product/product.service';
import { RegisterObj } from 'src/app/interface/register';
import { LoginObj } from 'src/app/interface/login';
import { LoginService } from 'src/app/services/login/login.service';
@Component({
  selector: 'app-web-products',
  templateUrl: './web-products.component.html',
  styleUrls: ['./web-products.component.css']
})
export class WebProductsComponent {
  @ViewChild('productContainer') productContainer!: ElementRef;

  productsToShow: any[] = [];
  products: any[] = [];
  CategoryList: any[] = [];
  ProductList: Product[] = [];
  filteredProductsList!: any[];
  isAddToCartApiCallInProgress: boolean = false;
  currentIndex = 0;

  loginObj:LoginObj={
    custId: 0,
    phoneNumber: 0,
    custName: '',
    password: ''

}
  

  
  registerObj: RegisterObj = {
    custId: 0,
    custName: '',
    phoneNumber:0,
    password: ''
};

  constructor(private productService: ProductService, private router: Router,private loginService:LoginService) {}

  ngOnInit(): void {

    this.getProducts();
    this.getCategories();
    this.localStorageId = localStorage.getItem('CusID') as string;
    this.intValue = parseInt(this.localStorageId);
  }
   
  customerId:number=0;
  localStorageId:string='';
  intValue:number=0;
 cusid = this.intValue;
  addToCart(productId: number,quantity: any) {
    this.customerId=this.loginObj.custId;
    this.localStorageId = localStorage.getItem('CusID') as string;
    this.intValue = parseInt(this.localStorageId);
    const addToCardObj = {
      "cartId": 0,
      "custId": this.intValue?this.intValue:0,
      "productId": productId,
      "quantity": quantity,
      "addedDate": new Date()
    };
    if(this.localStorageId == null){
      alert("Please Login");
    }
    else{
      this.productService.addToCart(addToCardObj).subscribe({
      
        next: (res) => {
          if (res) {
            alert('Product added to cart');
            window.location.reload();
          } else {
            alert(res.message);
          }
        },
        error: (error) => {
          console.error('Error adding product to cart:', error);
          // Handle error here
        }
      });
    }
  }

  navigateToProducts(categoryId: number) {
    this.router.navigate(['/products', categoryId]);
  }

  getCategories() {
    this.productService.getCategories().subscribe(
      (data: any[]) => {
        this.CategoryList = data;
      }, 
      error => {
        console.error("Error fetching categories:", error);
      }
    );
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (data: any[]) => {
        this.ProductList = data;
        this.filteredProductsList = data;
      }, 
      error => {
        console.error("Error fetching products:", error);
      }
    );
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

  getQuantity(product: any): number {
    return product.quantity || 1;
  }
}
