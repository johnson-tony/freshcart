import { Component, OnInit,ElementRef, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/services/product/product.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { RegisterObj } from 'src/app/interface/register';
import { LoginObj } from 'src/app/interface/login';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  location: any;
toggleDropdown() {
  this.showDropdown = !this.showDropdown;
}
checkoutClicked: boolean = false;
  showDropdown = false;
  registerForm!: FormGroup;
  ProductList: Product[] = [];
  CategoryList: any[] = [];
  filteredProductsList: Product[] = [];
  cartList: any[] = [];
  
  phonePattern: string = "^((\\+91-?)|0)?[0-9]{10}$";
  passwordPattern: any = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\#?!@$%^&*\-])/;
  
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
    private elementRef: ElementRef,private toastr: ToastrService
  ) {
    this.productService.cartUpdated$?.subscribe((res:any)=>{
     
      this.getCartProductbyCustomerId(this.customerId );
    })
  }

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
    this.getCartProductbyCustomerId(this.customerId);
    
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
           
            this.toastr.success("Registration Completed. Please login.");
            this.closeRegisterModel();
            this.loginReset()
          }
        },
        (error) => {
          console.error("Error occurred while registering customer:", error);
          this.toastr.warning("Registration failed. This Phone Number Already Registered");
          this.loginReset()
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
      this.loginReset() 
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
        this.toastr.success("Login successful");
        this.loginObj.phoneNumber = 0;
        this.loginObj.password = '';
        this.loginReset() 
        this.closeLoginModel();
      },
      error => {
        console.error('Error fetching categories:', error);
        this.toastr.error("Invalid PhoneNumber or Password");
      }
    );
  }
  getCartProductbyCustomerId(custId: number){
    this.productService.getCartDataByCustomerId(custId).subscribe(
      (data:any[])=>{
        this.cartList=data;
      }
    )
  }

  navigateToLogin() {
    
    this.router.navigate(['/login']);
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
  close()
  {
    this.showDropdown = true;
    this.toggleDropdown()
  }
  
  onLogOut(loginObj:any){
    localStorage.clear(); // Clear all items in local storage
    window.location.reload(); // Reload the page
  }
  loginReset() {
    this.loginObj.custId = 0;
    this.loginObj.custName = '';
    this.loginObj.phoneNumber = 0;
    this.loginObj.password = '';
  }
  
  }

