import { Component, OnInit,ElementRef, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/services/product/product.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { RegisterObj } from 'src/app/interface/register';
import { LoginObj } from 'src/app/interface/login';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  
  registerForm!: FormGroup;
  ProductList: Product[] = [];
  CategoryList: any[] = [];
  filteredProductsList: Product[] = [];
  cartList: any[] = [];
  
  registrationSuccess: boolean =false;
 
  registerObj: RegisterObj = {
    custId: 0,
    custName: '',
    phoneNumber: 0,
    password: ''
  };

  loginObj: LoginObj = {
    custId: 0,
    custName: '',
    phoneNumber: 0,
    password: ''
    
  };
 

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private loginService: LoginService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      custName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      
    });
    this.customerName = localStorage.getItem('CusName') as string;
    const local = localStorage.getItem('CusID') as string;
    this.customerId = parseInt(local);
    if(this.customerName != null){
      const loginicon: HTMLElement | null = this.elementRef.nativeElement.querySelector('#loginicon');
    if (loginicon) {
      loginicon.style.display = 'none'; // Hide the login icon
    }
    }
    this.getProducts();
    this.getCategories();
  }
  customerName:string='';
  customerId:number=0;
  
  openRegisterModel(): void {
    const registerModal = document.getElementById('RegisterModel');
    if (registerModal) {
      registerModal.classList.add('show');
      registerModal.style.display = 'block';
    }
  }

  closeRegisterModel(): void {
    const registerModal = document.getElementById('RegisterModel');
    if (registerModal) {
      registerModal.classList.remove('show');
      registerModal.style.display = 'none';
    }
  }

  saveCustomer() {
     {
      this.loginService.registerCustomer(this.registerObj).subscribe(
        (res: any) => {
          if (res) {
           
            alert("Registration Completed. Please login.");
            this.closeRegisterModel();
          }
        },
        (error) => {
          console.error("Error occurred while registering customer:", error);
          alert("Registration failed. This Phone Number Already Registered");
        }
      );
    }
  }

  openLoginModel(): void {
    const loginModal = document.getElementById('LoginModel');
    if (loginModal) {
      loginModal.classList.add('show');
      loginModal.style.display = 'block';
    }
  }

  closeLoginModel(): void {
    const loginModal = document.getElementById('LoginModel');
    if (loginModal) {
      loginModal.classList.remove('show');
      loginModal.style.display = 'none';
    }
  }

  loginCustomer() {
    this.loginService.checkCredential(this.loginObj.phoneNumber, this.loginObj.password).subscribe(
      (data: LoginObj) => {
        this.loginObj = data;
        console.log(data)
        localStorage.setItem('CusID', data.custId.toString());
        localStorage.setItem('CusName', data.custName);
        this.customerId = data.custId;
        this.customerName = data.custName;
        const loginicon: HTMLElement | null = this.elementRef.nativeElement.querySelector('#loginicon');

    if (loginicon) {
      loginicon.style.display = 'none'; // Hide the login icon
    }
        alert("Login successful");
        this.closeLoginModel();
      },
      error => {
        console.error('Error fetching categories:', error);
        alert("Invalid PhoneNumber or Password");
      }
    );
  }

  getCategories(): void {
    this.productService.getCategories().subscribe(
      (data: any[]) => {
        this.CategoryList = data;
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.ProductList = data;
        this.filteredProductsList = data;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }
 
  navigateToProducts(id: number): void {
    this.router.navigate(['/products', id]);
  }

  calculateTotal(): number {
    let total = 0;
    for (const item of this.cartList) {
      total += (item.price * item.quantity);
    }
    return total;
  }

  remove(cartId: any) {
    // Implement cart item removal logic here
    console.log("Removing item with ID:", cartId);
  }
  onLogOut(loginObj:any){
    localStorage.clear(); // Clear all items in local storage
    window.location.reload(); // Reload the page
  }
}
