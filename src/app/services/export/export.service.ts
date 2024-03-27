import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportToCSV(filename: string, data: any[]) {
    const headers = [
      'Sale Id',
      'Sale Date',
      'Customer id',
      'Customer Name',
      'Payment Method',
      'Total Amount',
      'Delivery Address',
      'City'
    ];

    let csvContent = headers.join(',') + '\r\n'; // Include headers

    data.forEach(row => {
      const rowData: string[] = [];
      headers.forEach(header => {
        const value = row[header];
        const formattedValue = this.formatCSVValue(value);
        rowData.push(formattedValue);
      });
      csvContent += rowData.join(',') + '\r\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    if ((navigator as any).msSaveBlob) {
      (navigator as any).msSaveBlob(blob, filename);
    } else {
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

  private formatCSVValue(value: any): string {
    if (value === null || value === undefined) {
      return '';
    }
    if (typeof value === 'string') {
      return '"' + value.replace(/"/g, '""') + '"';
    }
    return value.toString();
  }
}
