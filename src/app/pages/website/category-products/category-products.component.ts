import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/services/product/product.service';
import { RegisterObj } from 'src/app/interface/register';
import { ToastrService } from 'ngx-toastr';
import { CategoryObj } from 'src/app/interface/category';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {
  products: any[] = [];
  CategoryList:any[]=[];
  activateCategoryId: number = 0;
  CategoryObj:CategoryObj={
    categoryId: 0,
    categoryName: 'string',
    parentCategoryId: 0
  }
    categoryId=0;
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
        this.products = res;
        var head = document.getElementById('heading');
        if(head != null)
        {
          if(this.activateCategoryId == 1)
          {
            head.innerHTML="Fruits";
          }
          else if(this.activateCategoryId ==2) 
          {
            head.innerHTML="Vegitables";
          }
          else if(this.activateCategoryId==3)
          {
            head.innerHTML="Instant food";
          }
          else if(this.activateCategoryId==4)
          {
            head.innerHTML="Cleaning Essentials";
          }
          else if(this.activateCategoryId==5)
          {
            head.innerHTML="Snakes";
          }
          else if(this.activateCategoryId==7)
          {
            head.innerHTML="Body Care";
          }
          else if(this.activateCategoryId==11)
          {
            head.innerHTML="Pet Care";
          }
          else if(this.activateCategoryId==12)
          {
            head.innerHTML="Milk Items";
          }
          else if(this.activateCategoryId==13)
          {
            head.innerHTML="Oil Item";
          }
          else if(this.activateCategoryId==15)
          {
            head.innerHTML="Rice & Atta";
          }
          else if(this.activateCategoryId==16)
          {
            head.innerHTML="Pharma & Hygine";
          }
          else if(this.activateCategoryId==17)
          {
            head.innerHTML="Juice";
          }
          else if(this.activateCategoryId==18)
          {
            head.innerHTML="Pulses";
          }
          else if(this.activateCategoryId==15)
          {
            head.innerHTML="Pet Care";
          }
        }
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
searchQuery: string = '';
filterItems() {
  this.productService.getProductById(this.activateCategoryId,this.searchQuery).subscribe(
    (data: any[]) => {
      this.products = data;
      setTimeout(() => {
         const head = document.getElementById('heading');    
        this.loadProducts();
      }, 7000); 
      const head = document.getElementById('heading');
      
      if (head !== null) {
        if (this.products.length == 0) {
          head.innerHTML = "No Items Found";
        }
      }
      this.searchQuery = '';
    },
    error => {
      console.error("Error fetching products:", error);
    }
  );
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
