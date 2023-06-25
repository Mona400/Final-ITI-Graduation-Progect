import { Component } from '@angular/core';
import * as Aos from 'aos';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router'
import Swiper from 'swiper';
import { Observable } from 'rxjs';
// import fs  from "font-awesome";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

  constructor(){
     Aos.init({once: false,easing: 'ease'});
     new Swiper(".mySwiper",{
      pagination:{
        el:".swiper-pagination",
        clickable:true
      }
    })
    }
  title = 'Ecommerce';
}


