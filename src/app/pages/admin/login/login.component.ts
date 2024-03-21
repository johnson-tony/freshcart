import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  rememberMe = false;
  loginObj:any ={
    
    userName: '',
    password: '',
};
constructor(private router:Router,private toastr:ToastrService){}

  onLogin(): void {
    if (this.rememberMe) {
      localStorage.setItem('userName', this.loginObj.userName);
      localStorage.setItem('password', this.loginObj.password);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
    if(this.loginObj.userName=="admin"&& this.loginObj.password =="112233"){
     this.router.navigateByUrl('/products')
    
    }else{
      this.toastr.error("Wrong Credentials")
     }
    }

}
