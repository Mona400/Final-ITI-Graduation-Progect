import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SignUpService   {

  constructor( private myservice:HttpClient) { }



  // newUser:any;





 /// this functin related to sign up
  addnewuser(newuser:any){

    return this.myservice.post(environment.baseApi + 'Authentication/register' ,newuser ) ;

  }
  // throw new Error('Method not implemented.');
}






