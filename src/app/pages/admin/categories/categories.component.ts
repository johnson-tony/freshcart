import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  CategoryList: any[] = [];
   
  constructor(private productService: ProductService,private toastr:ToastrService) {}
  inputValue: string = '';
  CategoryId:number = 0;
  ngOnInit(): void {
    this.getCategories();
  }
  openModel(): void {
    const modalDev = document.getElementById('myModal');
    if (modalDev) {
      modalDev.classList.add('show');
      modalDev.style.display = 'block';
    }
  }

  onEdit(categoryId: number, categoryName: string): void {
    this.openModel();
    this.inputValue = categoryName;
    this.CategoryId = categoryId;
    console.log('Edit clicked for Category ID:', categoryId);
    console.log('Category Name:', categoryName);
  }

  closeModel(): void {
    const modalDev = document.getElementById('myModal');
    if (modalDev) {
      modalDev.classList.remove('show');
      modalDev.style.display = 'none';
    }
  }
  insertCategory(categoryId:number): void {
    this.closeModel();
    var obj = {}
    if(this.CategoryId == 0){
       obj = { 
        categoryId: 0,
        categoryName: this.inputValue,
        parentCategoryId: 0
      };
    }else{
       obj = { 
        categoryId: this.CategoryId,
        categoryName: this.inputValue,
        parentCategoryId: 0
      };
    }
    this.productService.CreateCategory(obj).subscribe((res: any) => {
      if (res) {
        if(this.CategoryId == 0){
          this.toastr.success("Category created successfully");
        }
        else{
          this.toastr.success("Category Updated successfully");
        }
        this.getCategories();
      }
    });
  }

  onDelete(categoryId: number) {
    const isDelete = confirm('Are you sure you want to delete?');
    if (isDelete) {
      this.productService.deleteCategories(categoryId).subscribe((res: any) => {
        console.log(res);
        this.toastr.success("Category Deleted Successfully");
        window.location.reload();
      }, (error: any) => {
        console.error("Error deleting Category:", error);
      });
    }
  }

  
  getCategories(): void {
    this.productService.getCategories().subscribe(
      (data: any[]) => {
        this.CategoryList = data;
      }, 
      error => {
        console.error("Error fetching categories:", error);
      }
    );
  }
}
