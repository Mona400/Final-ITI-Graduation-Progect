import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private myservice:HttpClient) {
   }



   ///  login crud function

   LoginMeIn(payload){
    return this.myservice.post(environment.baseApi + "Authentication/Login" , payload)
   }



}
