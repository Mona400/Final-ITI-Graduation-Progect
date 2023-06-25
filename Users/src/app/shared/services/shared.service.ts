import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',

})
export class SharedService {

  constructor(public http:HttpClient) { }

  state={};

  cart={}

  current_user;
  my_checkAuth(){
    if(localStorage.getItem('Loggedin') == 'true') return true;
    return false
  }

  sign_me_in(payload){
    this.current_user = payload
  }

  GetUser(userid:string){
    return this.http.get(environment.baseApi+'user/'+userid)
  }

  RetriveUser(){
    return JSON.parse( localStorage.getItem("user"))
  }
  UpdateUser(userID , payload){
    return this.http.patch(environment.baseApi + 'user/'+userID , payload)
  }

}
