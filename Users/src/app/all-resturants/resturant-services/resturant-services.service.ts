import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResturantServicesService {
  environment = environment
  constructor(private http:HttpClient) { }
   base = environment.baseApi + 'resturant'
  getAllRestaurants() {
    return this.http.get(this.base);
  }
  SearchBySlug(slug:string) {
    return this.http.get(this.base +'?search='+slug);
  }

  getProductByCategory(keyword:string) {
    return this.http.get(this.base + '/category/'+keyword);
  }
  getRestaurantById(id:any) {
    return this.http.get(this.base+'/GetBy'+id);
  }

  getRestaurantReviews(id:any) {
    return this.http.get(this.base+'/'+id+'/reviews');
  }

  PostReview(Rest_id:string , user_id:any,payload:any){
    return this.http.post(environment.baseApi + `review`,payload)
  }
}
