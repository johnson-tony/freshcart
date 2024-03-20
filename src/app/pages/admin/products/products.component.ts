import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/interface/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  @ViewChild('productFrm') productFrm!: NgForm;
  isSidePanelVisible: boolean = false;
  displayModalProduct: boolean = false;
  CategoryList: any[] = [];
  ProductList: Product[] = [];
  filteredProductsList: any[] = [];
  isApiCallInProgress: boolean = false;
  first: number = 0;
  rows: number = 100;
  productSrv: any;

  productObj: Product = {
    productId: 0,
    productSku: "",
    productName: "",
    productDescription: "",
    shortName: "",
    price: 0,
    createdDate: new Date(),
    imageUrl: "",
    deliveryTime: "",
    categoryId: 0,
  
  };

  constructor(private productService: ProductService,private toastr:ToastrService) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  getCategories(): void {
    this.productService.getCategories().subscribe(
      (data: any[]) => {
        this.CategoryList = data;
      }, error => {
        console.error("Error fetching categories:", error);
    });
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (data: any[]) => {
        this.ProductList = data;
        this.filteredProductsList = data;
      }, error => {
        console.error("Error fetching products:", error);
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.CategoryList.find(c => c.categoryId === categoryId);
    return category ? category.categoryName : '';
  }

  onSave() {
    this.productService.saveProducts(this.productObj).subscribe((res: any) => {
      if (res) {
         this.toastr.success("Product created successfully");
         this.getProducts();
      } else {
        this.toastr.error("Failed to create product: " + res.message);
      }
    }, error => {
      console.error("Error saving product:", error);
    });
  }
  
  clearFields() {
     
      this.productObj = {
        productId: 0,
        productSku: "",
        productName: "",
        productDescription: "",
        shortName: "",
        price: 0,
        createdDate: new Date(),
        imageUrl: "",
        deliveryTime: "",
        categoryId: 0,
        
      
    }
    
    }

  onDelete(product: any) {
    const isDelete = confirm('Are you sure you want to delete?');
    if (isDelete) {
      const productId = product.productId;
      this.productService.deleteProduct(productId).subscribe((res: any) => {
        console.log(res);
        this.toastr.success("Product Deleted Successfully");
        window.location.reload();
      }, error => {
        console.error("Error deleting product:", error);
      });
    }
  }

  onEdit(product: Product) {
    this.productObj = product;
  // Open the side panel to display the form for editing
  this.openSidePanel();
  }

  openProductModal() {
    this.displayModalProduct = true;
  }

  closeProductModal() {
    this.displayModalProduct = false;
  }

  openSidePanel(): void {
    this.isSidePanelVisible = true;
  }

  closeSidePanel(): void {
    this.isSidePanelVisible = false;
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isFormValid() {
    return true;
    }
}
