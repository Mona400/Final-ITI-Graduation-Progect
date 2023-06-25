import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private myCart: HttpClient) {}


  createCart(data:any){
    return this.myCart.post(`${environment.baseApi}cart` , data)
  }

  clearCart(userid , cartID){
    return this.myCart.delete(`${environment.baseApi}cart/${cartID}/${userid}` )
  }

  GetSpecificCartByUserID(userID:string){
    return this.myCart.get(`${environment.baseApi}cart/${userID}`)
  }

  AddMeals(data:any ,  useriD:string){
    return this.myCart.patch(`${environment.baseApi}cart/addmeals/${useriD}` , data)
  }
  RemoveMeals(data:any ,  useriD:string){
    return this.myCart.delete(`${environment.baseApi}cart/removemeals/${useriD}/${data}`)
  }

  createSubscribtion(data: any , userid) {
    return this.myCart.post(`${environment.baseApi}Sub/users/${userid}/sub`, data , {
      headers:{
        authorization:localStorage.getItem("token")
      }
    });
  }

  // deleteSubscribtion(data: any) {
  //   return this.myCart.delete(
  //     `${this.BaseUrl}/users/${data.userID}/subs`,
  //     data
  //   );
  // }
}
