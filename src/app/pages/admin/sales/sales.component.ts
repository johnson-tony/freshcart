import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit{
  SalesList:any[]=[];
  isChecked = false;
  constructor(private productService: ProductService,private toastr:ToastrService){}

  ngOnInit(): void {
    this.getSales();
  }
  
  exportToCSV(filename: string, rows: any[]) {
    const csvContent = this.convertArrayOfObjectsToCSV(rows);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
    if ((navigator as any).msSaveBlob) { // Use type assertion
      (navigator as any).msSaveBlob(blob, filename); // Use type assertion
    } else {
      // Handle file download for other browsers
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
  

  private convertArrayOfObjectsToCSV(data: any[]): string {
    const csv = data.map(row => Object.values(row).join(',')).join('\n');
    return 'data:text/csv;charset=utf-8,' + csv;
  }
  exportTable() {
    // You may need to modify this depending on your data structure
    this.exportToCSV('table_data.csv', this.SalesList);
  }
  
  getSales(): void {
    this.productService.getAllSales().subscribe(
      (data: any[]) => {
        this.SalesList = data;
      }, 
      error => {
        console.error("Error fetching categories:", error);
      }
    );
  }
  


  onCheckboxClick() {
    this.toastr.success('Order Delivered!');
  }

}
