import { Component, OnInit, EventEmitter, Input } from '@angular/core';
// import { PickerInteractionMode } from 'igniteui-angular';
import { CartService } from '../../services/cart.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
   cart_payload;
   test_payLoad;
   current_user;
   enviroment = environment.ImgURL
   total_price=0;
   form:FormGroup;
   @Input() color: string;
   loading_stating = true
  constructor(public myService: CartService , private _router:Router , public sh:SharedService , public build:FormBuilder) {
    this.current_user = this.sh.RetriveUser()

    this.cart_payload = JSON.parse(localStorage.getItem("cart"))



    console.log('user' , this.current_user)
    this.form = build.group({
      visaNumber:['' , Validators.required],
      holderName:['' , Validators.required],
      visaExpirationDate:['' , Validators.required],
      cardVerificationValue:['' , Validators.required],
    })

  }

  Restaurant = '';
  DateCreated = '';
  DateExpaired = '';
  // public mode: PickerInteractionMode = PickerInteractionMode.DropDown;
  myEvent = new EventEmitter();

  async Add() {

    console.log(this.form.value)
    console.log(this.current_user)
    if(!this.form.valid){
      await  swal.fire("Sorry", "You Need to fill your data", "info");

      return;
    }
    let date = new Date();
    date.setMonth(date.getMonth() + 1);
    // "Confirmation", `this subscription will last till ${date}`, "info"
    if((await swal.fire({title:"Confirmation" , text:`this subscription will last till ${date}` , icon:"info"})).isConfirmed ){

     // let {restaurantID , restaurantName , restaurantImg} = this.cart_payload[0]
     console.log( this.cart_payload)
     let cart_id = this.cart_payload.id
     debugger
    this.cart_payload = {
      restaurantID : this.cart_payload.meals[0].restID,
      restaurantImg : this.cart_payload.meals[0].restImg,
      subState:0,
      paymentDetails : this.form.value,
      //Dates:[...(this.cart_payload.meals.map(el => el.arrival_Time ))],
      monthly_price:this.total_price,
      meals_and_Dates : [...(this.cart_payload.meals.map(el => {
       return {"meal_id": el.meal_id,
       "meal_Img": el.meal_Img,
       "restImg": el.restImg,
       RestID : el.restID,
       "restTitle": el.restTitle,
       "meal_Name": el.meal_Name,
       "arrival_Time": el.arrival_Time}
      }))]

      }
    console.log(this.current_user);

    this.myService.createSubscribtion(this.cart_payload , this.current_user.userID)
    .subscribe(res => {
      debugger
      this.myService.clearCart(this.current_user.userID , cart_id )
      .subscribe((res) => location.reload())
      console.log(res)
    })
/*
{
  "monthly_price": 59.99,
  "restaurantID": 1,
  "restaurantImg": "test.png",
  "subState": 1,
  "meals_and_Dates": [
    {
      "meal_id": 1,
      "meal_Img": "test.png",
      "meal_Name": "Meal#1",
      "arrival_Time": "04:00 PM"
    }
  ]
}
*/
      // this.cart_payload = {
      //   monthly_price : this.cart_payload.monthly_price,
      //   subState: 0 ,
      //   meals_and_Dates : [
      //     this.ca
      //   ]
      // }
//     this.myService.createSubscribtion(this.cart_payload).subscribe({
//       next: async (res) => {
//         // console.log(res);
//       await  swal.fire("Good job!", "You Have Successfully Subscriped", "success");
//       this.cart_payload = []
//       localStorage.setItem("cart","[]")

//       },
//     async  error(err) {
// // "Session Timed Out", "You Need to log in", "error" ,
//        let res =await swal.fire({
//         title:"Session Timed Out",
//         text:"You Need to log in",
//         icon:"error",
//         showCancelButton:true,
//         showDenyButton:true,
//         showConfirmButton:true
//        }  );
//         if(res){
//           localStorage.setItem("Loggedin" , "false");
//           localStorage.setItem("user","{}")
//           location.replace("login")
//         }
//         console.log(err);
//       },
//     });
    }


  }
  removeCartItem(id){
    console.log(id)
    this.myService.RemoveMeals(  id , this.current_user.userID).subscribe(res => {
        //this.cart_payload = res
       location.reload()
    })
  }
  getData(data: any) {
    console.log(data);
  }
  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem("user"))
    this.myService.GetSpecificCartByUserID(user.userID)
    .subscribe((res:any) => {
      console.log(res)
      this.cart_payload = res
      res.meals.forEach(meal => {
        this.total_price += meal.meal_Price
      })
    })
    // this.cart_payload= JSON.parse(localStorage.getItem("cart") || '[]') ;
    // this.cart_payload.forEach(element => {
    //   this.total_price += element.price;
    // });
    // this.test_payLoad= JSON.parse(localStorage.getItem("user"))

    // this.test_payLoad['userID']=   this.test_payLoad['_id']
    // delete this.test_payLoad['_id'];

    // console.log(this.cart_payload)

    this.loading_stating = false
  }
}
