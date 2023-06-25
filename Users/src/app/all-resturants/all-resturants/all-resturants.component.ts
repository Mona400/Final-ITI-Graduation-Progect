import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {ResturantServicesService} from '../resturant-services/resturant-services.service'
import { SharedService } from '../../shared/services/shared.service';
import slugify from 'slugify';

import { ActivatedRoute , Router } from '@angular/router';

@Component({
  selector: 'app-all-resturants',
  templateUrl: './all-resturants.component.html',
  styleUrls: ['./all-resturants.component.scss']
})
export class AllResturantsComponent implements OnInit{
  payload;
  all_data;
  loading_state = true
  search_text=""
  constructor(public restService:ResturantServicesService , public State:SharedService , private _router:Router , public Current_route:ActivatedRoute){




   }


  policyOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots:false,
    navSpeed: 700,
    navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }

  filterArr(){
    console.log("asdasd")

    this.payload = this.all_data.filter(date => date.title.toLowerCase().includes(this.search_text.toLowerCase()))

  }
  ngOnInit(): void {
    let query_search = this.Current_route.snapshot.queryParams['search']

    let query = query_search ? this.restService.SearchBySlug(query_search)  : this.restService.getAllRestaurants()


    query.subscribe({
      next:(res)=>{
        this.all_data=res
        this.payload=res
        this.State.state["commuter"] = res
        this.loading_state = false
      }
    })
  }


}
