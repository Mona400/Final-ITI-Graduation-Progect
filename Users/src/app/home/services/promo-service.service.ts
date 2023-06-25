import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Promotion , ExpirationDate} from '../types/Promotion'




@Injectable({
  providedIn: 'root'
})
export class PromoServiceService {

  environment = environment

  constructor(private http:HttpClient) { }

  getPromotion():Observable<[Promotion]>{
   return this.http.get<[Promotion]>(this.environment.baseApi + "Promotion")
  }


}
