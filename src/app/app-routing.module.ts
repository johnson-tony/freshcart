import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/admin/login/login.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { WebProductsComponent } from './pages/website/web-products/web-products.component';
import { LandingComponent } from './pages/website/landing/landing.component';
import { CategoryProductsComponent } from './pages/website/category-products/category-products.component';
import { CheckoutComponent } from './pages/website/checkout/checkout.component';
import { CardComponent } from './shared/components/card/card.component';
import { SalesComponent } from './pages/admin/sales/sales.component';
import { CustomerComponent } from './pages/admin/customer/customer.component';


export const routes: Routes = [
  
 {path:'',redirectTo:'Allproducts',pathMatch:'full'},
 {path:'login',component: LoginComponent},
 

 {path:'',component: LayoutComponent,
 children:[
  {path:'products',component: ProductsComponent},
{path:'categories',component: CategoriesComponent},
{path:'customer',component: CustomerComponent},
{path:'sales',component:SalesComponent}]
},


{
  path:'',
  component:LandingComponent,
  children: [
      {
          path:'Allproducts',
          component:WebProductsComponent
      },

      {
        path:'products/:id',
        component:CategoryProductsComponent
      },
      
       {
        path:'checkout',
        component:CheckoutComponent
      },

      {
        path:'cart',
        component:CardComponent
      }
  ],


 

}
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
