import { Component , OnChanges, SimpleChanges } from '@angular/core';
import { MealsServicesService } from './../resturant-services/meals-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResturantServicesService } from './../resturant-services/resturant-services.service';
import * as Toastify from 'toastify-js';
import { SharedService } from 'src/app/shared/services/shared.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { CartService } from 'src/app/Alyaa/services/cart.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent  {
  selected_menu='breakfast'
  payload:any = {rest:{} , meals:{}};
  cart;
  loading_state = true;
  enivroment = environment.ImgURL

  constructor( private CartService:CartService , public _router:Router ,public sh:SharedService ,public MealService:MealsServicesService , public RestService:ResturantServicesService , public currentRoute:ActivatedRoute){
    const id = currentRoute.snapshot.params["id"]
    MealService.getAllMeals(id).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.payload.rest = res[0].restaurant;
        this.payload.meals.all = res;
        this.payload.meals.current = res.filter(meal => meal.section.name.toLowerCase() == 'breakfast')
        console.log( this.payload.meals.current)
        this.loading_state = false;


      }
    })


  }


  category_click(e){

    if(e.target.classList.contains("nav-link") || e.target.children.length == 0){
      this.selected_menu = e.target.innerText.toLowerCase()
      this.payload.meals.current = this.payload.meals.all.filter(meal => meal.section.name.toLowerCase() == e.target.innerText.toLowerCase())

    }
  }

  addToCart(item:any){
    console.log(item)

    if(!this.sh.my_checkAuth()){
      this._router.navigateByUrl('/login')
      Swal.fire("You Need to login" , "You need to be logged in",'info')
      return;
    }

    var meals_added = {
      meal_id: item.id,
      meal_Img: item.image,
      meal_Name: item.name,
      meal_Price : item.price,
      RestTitle:item.restaurant.title,
      RestImg:item.restaurant.image,
      RestID : item.restaurant.id,
      arrival_Time: "04:00 PM"
    }
    var current_user = JSON.parse(localStorage.getItem("user") || '[]')
    if(current_user.length == 0){
      Toastify({

        text: "You Need to LOGIN First",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "red",
        },

        }).showToast();
    }else{
      console.log(meals_added)
          this.CartService.AddMeals(meals_added , current_user.userID)
          .subscribe(_ => {
            Toastify({

              text: "Successfully Added To Cart",
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: "top", // `top` or `bottom`
              position: "center", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: "darkgreen",
              },

              }).showToast();
          })

    }
    //adding new cart to database
    /*
{
  "userId": "string",
  "monthlyPrice": 0,
  "discount": "string",
  "meals_dates": [
    {
      "meal_id": 0,
      "meal_Img": "string",
      "meal_Name": "string",
      "arrival_Time": "string"
    }
  ],
  "paymentDetails": {
    "visaNumber": "string",
    "cardVerificationValue": 0,
    "holderName": "string",
    "visaExpirationDate": "string"
  }
}
    */

  // let cart = {
  //   userId: this.sh.current_user.id,
  // monthlyPrice: item.price,
  // discount: "95",
  // meals_dates: [
  //   {
  //     "meal_id": item.id,
  //     "meal_Img": item.,
  //     "meal_Name": "string",
  //     "arrival_Time": "string"
  //   }
  // ],
  // "paymentDetails": {
  //   "visaNumber": "string",
  //   "cardVerificationValue": 0,
  //   "holderName": "string",
  //   "visaExpirationDate": "string"
  // }
  // }

 //  localStorage.setItem("cart", JSON.stringify(cart))




  }


}
