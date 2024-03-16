import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { LandingComponent } from './pages/website/landing/landing.component';
import { CategoryProductsComponent } from './pages/website/category-products/category-products.component';
import { WebProductsComponent } from './pages/website/web-products/web-products.component';
import { CheckoutComponent } from './pages/website/checkout/checkout.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CustomerComponent } from './pages/admin/customer/customer.component';
import { OrderComponent } from './pages/admin/order/order.component';
import { CustomerCartComponent } from './pages/website/customer-cart/customer-cart.component';
import { CustomerOrderComponent } from './pages/website/customer-order/customer-order.component';
import { CardComponent } from './shared/components/card/card.component';
import { OfferCardComponent } from './shared/components/offer-card/offer-card.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ProductsComponent,
    CategoriesComponent,
    LandingComponent,
    CategoryProductsComponent,
    WebProductsComponent,
    CheckoutComponent,
   CustomerComponent,
   OrderComponent,
   CustomerCartComponent,
   CustomerOrderComponent,
   CardComponent,
   OfferCardComponent,
  
  
    
  
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    TableModule,
    ToastrModule, 
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
