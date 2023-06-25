// import { HttpClient } from '@angular/common/http';
// import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  getAllProducts() {
    return this.http.get(environment.baseApi + 'products');
  }
  getAllCategories() {
    return this.http.get(environment.baseApi + 'products/categories');
  }
  getProductByCategory(keyword:string) {
    return this.http.get(environment.baseApi + 'products/category/'+keyword);
  }
  getProductById(id:any) {
    return this.http.get(environment.baseApi + 'products/'+id);
  }

}
