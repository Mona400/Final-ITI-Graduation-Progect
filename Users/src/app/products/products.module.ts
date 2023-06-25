import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';
import { SelectComponent } from '../shared/components/select/select.component';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './components/product/product.component';



@NgModule({
  declarations: [
    AllProductsComponent,
ProductDetailsComponent,
ProductComponent,


  ],
  imports: [
    CommonModule,
BrowserModule,
    FormsModule,
   SharedModule

  ]
})
export class ProductsModule { }
