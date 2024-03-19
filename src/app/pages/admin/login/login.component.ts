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


  loginObj:any ={
    
    userName: '',
    password: '',
};
constructor(private router:Router,private toastr:ToastrService){}

  onLogin(): void {
    if(this.loginObj.userName=="admin"&& this.loginObj.password =="112233"){
     this.router.navigateByUrl('/products')
    
    }else{
      this.toastr.error("Wrong Credentials")
     }
    }

}
