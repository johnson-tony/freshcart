import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  registerCustomer(registerObj: any): Observable<any> {
    return this.http.post<any>('https://localhost:7279/api/CustomerRegisters/Registration',registerObj );
}
checkCredential(phoneNumber:number,password:string): Observable<any> {
  return this.http.get<any[]>(`https://localhost:7279/api/CustomerRegisters/CheckCredencial?PhoneNumber=${phoneNumber}&Password=${password}` );
}
}
