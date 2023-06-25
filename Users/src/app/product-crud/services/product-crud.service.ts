import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCrudService {

  constructor(private _http:HttpClient) { }
  //create by post
  poststudent(data:any){
    console.log(data)
    return this._http.post<any>("http://localhost:3000/products",data).
    pipe(map((res:any)=>{
      return res;
    }))
  }

  //get
  getstudent(){
   return this._http.get<any>("http://localhost:3000/products")
   .pipe(map((res:any)=>{
    return res;

   }))
  }

  //update
  updatestudent(data:any,id:number){
    return this._http.put("http://localhost:3000/products/"+id,data)
    .pipe(map((res:any)=>{
      return res;

    }))
  }

  //delete
  deletestudent(id:number){
    return this._http.delete<any>("http://localhost:3000/products/"+id)
    .pipe(map((res:any)=>{
return res;
    }))

  }
}
