import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  

  
  
  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7279/Categories/api/GetCategories');
  }
 
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7279/api/Products');
  }


  saveProducts(obj: any): Observable<any> {
    return this.http.post<any>('https://localhost:7279/api/Products', obj);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7279/api/Products/${productId}`);
  }

  getProductsByCategoryId(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7279/api/Products/Category/${categoryId}`);
  }

  
  CreateCategory(obj: any): Observable<any>{
    return this.http.post<any>('https://localhost:7279/Categories/api/CreateCategories', obj);
  }
  deleteCategories(categoryId: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7279/Categories/${categoryId}`);
  }
  addToCart(addToCartObj: any): Observable<any> {
    return this.http.post<any>('https://localhost:7279/api/AddToCarts', addToCartObj);
  }
  getCartDataByCustomerId(custId:any): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7279/api/AddToCarts/ByCustomerId/${custId}');
  }

}
