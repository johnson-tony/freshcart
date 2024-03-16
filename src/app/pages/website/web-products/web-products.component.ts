import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/services/product/product.service';
import { RegisterObj } from 'src/app/interface/register';
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
  prod = {
    productId: 0,
    quantity: 1
  };

  
  registerObj: RegisterObj = {
    custId: 0,
    custName: '',
    phoneNumber:0,
    password: ''
};

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
   
  }
   
  customerId:number=0;
  localStorageId = localStorage.getItem('CusID') as string;
  intValue = parseInt(this.localStorageId);
 cusid = this.intValue;
  addToCart(productId: number) {
    this.customerId=this.registerObj.custId;
    const addToCardObj = {
      "cartId": 0,
      "custId": this.intValue,
      "productId": productId,
      "quantity": this.prod.quantity,
      "addedDate": new Date()
    };
    if(this.customerId == this.intValue){
      alert("Please Login");
    }
    else{
      this.productService.addToCart(addToCardObj).subscribe({
      
        next: (res) => {
          if (res) {
            alert('Product added to cart');
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
