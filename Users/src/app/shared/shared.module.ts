import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import{HttpClientModule} from '@angular/common/http'

import { BrowserModule } from '@angular/platform-browser';
// import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './components/select/select.component';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    SpinnerComponent,
    SelectComponent,
    FooterComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,


    //  SpinnerComponent

RouterModule,
HttpClientModule,

  ],
  exports:[

    // BrowserModule,
    SpinnerComponent,
    FooterComponent,
    SpinnerComponent,
    RouterModule,
    FormsModule,
    SelectComponent,
    AppRoutingModule,




  ]
})
export class SharedModule { }
