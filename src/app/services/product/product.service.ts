import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public cartUpdated$: Subject<boolean>=new Subject();
  
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

  getCategoriesByCategoryId(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7279/Categories/GetCategories/${categoryId}`);
  }
  deleteCategories(categoryId: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7279/Categories/${categoryId}`);
  }
  addToCart(addToCartObj: any): Observable<any> {
    return this.http.post<any>('https://localhost:7279/api/AddToCarts',addToCartObj);
  }
  getCartDataByCustomerId(custId: number): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7279/api/AddToCarts/ByCustomerId/${custId}`);
  }

   PlaceonOrder( PlaceonOrderObj: any): Observable<any> {
    return this.http.post<any>('https://localhost:7279/api/PlaceOrders/PostPlaceOrder',PlaceonOrderObj);
  }
  removeProductByCartId(cartId: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7279/api/AddToCarts/DeleteCartItem/${cartId}`);
  }

  getAllCustomers(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7279/api/CustomerRegisters');
  }
 
  getAllSales(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7279/api/AddToCarts/api/GetAllSales');
  }

  getProductByName(name:string): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7279/api/Products/GetProductByName/${name}`);
  }

  getProductById(id:number,name:string): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7279/Categories/API/GetByCategoryID?id=${id}&name=${name}`);
  }

}
