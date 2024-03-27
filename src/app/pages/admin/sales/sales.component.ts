import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product/product.service';
import { ExportService } from 'src/app/services/export/export.service'; 
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  SalesList: any[] = [];
  isChecked = false;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private exportService: ExportService 
  ) {}

  ngOnInit(): void {
    this.getSales();
  }

  getSales(): void {
    this.productService.getAllSales().subscribe(
      (data: any[]) => {
        this.SalesList = data;
      },
      error => {
        console.error("Error fetching sales:", error);
      }
    );
  }

  title = 'export-excel';
    fileName = 'ExportExce.xlsx';
    exportexcel(): void {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.SalesList);
    
      
      const headerColumns = Object.keys(this.SalesList[0]); 
      headerColumns.forEach((col, index) => {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
        const cell = ws[cellAddress];
        cell.s = { bold: true }; 
      });
    
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
      XLSX.writeFile(wb, this.fileName);
    }
    
}


