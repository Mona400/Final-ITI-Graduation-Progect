import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import swiper from 'swiper';
import { PromoServiceService } from '../services/promo-service.service';
import {ExpirationDate, Promotion} from '../types/Promotion'
import { ResturantServicesService } from './../../all-resturants/resturant-services/resturant-services.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit {
  payload;
  ExpirationDate:ExpirationDate={
    days: '',
    date: undefined,
    hours: 0,
    mins: 0,
    secs: 0
  };

  Promo:Promotion
  slides: any[] = [
  {
    id: 0,
    src: '../../../assets/4749627-ai (2).png',
    title: 'DELECIOUS FOOD SYSTEM',

    subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
  }
,
{
  id: 0,
  src: '../../../assets/4749627-ai (2).png',
  title: 'DELECIOUS FOOD SYSTEM',

  subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
}


];
  constructor(public restSer:ResturantServicesService , public _router:Router , public PromoSer:PromoServiceService){

    restSer.getAllRestaurants().subscribe({
      next:(res:[])=>{
        this.payload = res.slice(0,4)

      }
    })
  }


  ngOnInit(): void {

    this.PromoSer.getPromotion().subscribe( (res:[Promotion]) => {
      console.log(res[0])

      this.Promo = res[0]
      this.Promo.imageUrl = environment.ImgURL + this.Promo.imageUrl

      this.ExpirationDate.date = res[0].date;


      var x = setInterval( () => {
        var futureDate=new Date( this.ExpirationDate.date ).getTime();//getTime Convert date to ms
        var today=new Date().getTime();
        var distance=futureDate-today;
        this.ExpirationDate.days=Math.floor(distance/(1000 * 60 * 60 *24) )
        this.ExpirationDate.hours=Math.floor((distance % (1000 * 60 * 60 *24))/(1000 * 60 * 60) );
        this.ExpirationDate.mins=Math.floor((distance % (1000 * 60 * 60 ))/(1000 * 60 ) );
        this.ExpirationDate.secs=Math.floor((distance % (1000 * 60 ))/(1000  ) );
        if(distance<0){
          clearInterval(x)
          this.ExpirationDate.days="Offer Is Expired"
        }
      } ,1000)


    } , er => console.log(er))



  }


  gotrest(){
    //this._router.navigateByUrl("all-resturants")
    location.replace("/all-resturants")
  }


}


