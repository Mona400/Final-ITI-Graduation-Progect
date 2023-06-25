import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubsServiceService {

  constructor(private http:HttpClient) { }

  getSubscribtions(userID){
   return this.http.get(environment.baseApi + `sub/users/${userID}/sub`,{
    headers:{
      authorization:localStorage.getItem("token")
    }
  })
  }
  DeleteSubscribtions(userID , subID){
    return this.http.delete(environment.baseApi + `sub/${subID}`,{
      headers:{
        authorization:localStorage.getItem("token")
      }
    })
   }

   UpdateSubs( subID , payload){
    return this.http.patch(environment.baseApi + `sub/${subID}/meals` , payload,{
      headers:{
        authorization:localStorage.getItem("token")
      }
    })
   }
}
